import { useState, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Camera, Loader2, MapPin, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { GENDERS, INTERESTS, PREFERENCES, RELIGIONS, LANGUAGES, RELATIONSHIP_STATUSES } from '@/lib/constants';
import { PageMeta } from '@/components/common/PageMeta';
import { Logo } from '@/components/common/Logo';
import { FullScreenLoader } from '@/components/common/FullScreenLoader';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Gender, Preference } from '@/types';

export default function Onboarding() {
  const { user, profile, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const fileInput = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(0);
  const [gender, setGender] = useState<Gender | null>(null);
  const [preference, setPreference] = useState<Preference | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [religion, setReligion] = useState<string>('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [location, setLocation] = useState<string>('');
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [relationshipStatus, setRelationshipStatus] = useState<string>('');
  const [pendingLocation, setPendingLocation] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (loading) return <FullScreenLoader />;
  if (!user) return <Navigate to="/login" replace />;
  if (profile?.onboarding_complete) return <Navigate to="/dashboard" replace />;

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  const onPickFile = (file: File) => {
    if (!file.type.startsWith('image/')) { toast.error('Please pick an image'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('Max 5 MB'); return; }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const toggleInterest = (i: string) => {
    setInterests((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : prev.length < 12 ? [...prev, i] : prev);
  };

  const toggleLanguage = (l: string) => {
    setLanguages((prev) => prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]);
  };

  const detectLocation = () => {
    if (!('geolocation' in navigator)) {
      toast.error('Geolocation not supported on this device');
      return;
    }
    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
            { headers: { Accept: 'application/json' } },
          );
          const data = await res.json();
          const addr = data?.address ?? {};
          const city = addr.city || addr.town || addr.village || addr.county || '';
          const country = addr.country || '';
          const formatted = [city, country].filter(Boolean).join(', ');
          if (formatted) setPendingLocation(formatted);
          else toast.error('Could not determine your city');
        } catch {
          toast.error('Could not detect your location');
        } finally {
          setDetectingLocation(false);
        }
      },
      () => {
        toast.error('Location permission denied');
        setDetectingLocation(false);
      },
      { enableHighAccuracy: false, timeout: 10000 },
    );
  };

  const next = () => {
    if (step === 1 && (!gender || !preference)) { toast.error('Pick both options'); return; }
    if (step === 3 && interests.length === 0) { toast.error('Pick at least one interest'); return; }
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  };

  const finish = async () => {
    if (!user) return;
    if (!gender || !preference) { setStep(1); return; }
    if (interests.length === 0) { toast.error('Pick at least one interest'); return; }
    setSaving(true);
    try {
      let avatar_url: string | null = profile?.avatar_url ?? null;
      if (avatarFile) {
        const ext = avatarFile.name.split('.').pop() || 'jpg';
        const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage.from('avatars').upload(path, avatarFile, { upsert: true });
        if (upErr) throw upErr;
        const { data } = supabase.storage.from('avatars').getPublicUrl(path);
        avatar_url = data.publicUrl;
      }
      const { error } = await supabase.from('profiles').update({
        gender, preference, bio: bio.trim(), interests, avatar_url,
        religion: religion || null,
        languages,
        location: location.trim() || null,
        relationship_status: relationshipStatus || null,
        onboarding_complete: true,
      }).eq('id', user.id);
      if (error) throw error;
      await refreshProfile();
      toast.success('Welcome to GoMilap!');
      navigate('/dashboard', { replace: true });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta title="Set up your profile — GoMilap" />
      <header className="px-6 py-5 flex items-center justify-between">
        <Logo />
        <span className="text-xs text-muted-foreground">Step {step + 1} of {totalSteps}</span>
      </header>
      <div className="px-6">
        <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-brand transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div key={step} className="w-full max-w-xl glass rounded-2xl p-7 sm:p-10 animate-slide-up">
          {step === 0 && (
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow">
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-display font-bold mt-5">Hey {profile?.full_name?.split(' ')[0] || 'there'} 👋</h1>
              <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                Let's set up your GoMilap profile so you can start meeting people who share your vibe.
              </p>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-2xl font-display font-bold">Tell us about you</h2>
              <p className="text-sm text-muted-foreground mt-1">This helps us personalize your discover feed.</p>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">I am</p>
                <div className="grid grid-cols-2 gap-2">
                  {GENDERS.map((g) => (
                    <button key={g.value} type="button" onClick={() => setGender(g.value)}
                      className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${gender === g.value ? 'border-primary bg-gradient-brand-soft text-foreground' : 'border-border hover:border-primary/50'}`}>
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Looking to meet</p>
                <div className="grid grid-cols-3 gap-2">
                  {PREFERENCES.map((p) => (
                    <button key={p.value} type="button" onClick={() => setPreference(p.value)}
                      className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${preference === p.value ? 'border-primary bg-gradient-brand-soft' : 'border-border hover:border-primary/50'}`}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-display font-bold">Add a profile photo</h2>
              <p className="text-sm text-muted-foreground mt-1">A clear photo helps people recognize you.</p>

              <div
                onClick={() => fileInput.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) onPickFile(f); }}
                className="mt-6 rounded-2xl border-2 border-dashed border-border hover:border-primary/60 transition-colors cursor-pointer p-8 text-center"
              >
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Preview" className="h-32 w-32 object-cover rounded-2xl mx-auto" />
                ) : (
                  <Avatar className="h-32 w-32 mx-auto">
                    <AvatarFallback className="bg-gradient-brand-soft">
                      <Camera className="h-10 w-10 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <p className="text-sm text-muted-foreground mt-4">Click or drag an image here</p>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5 MB</p>
                <input ref={fileInput} type="file" accept="image/*" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) onPickFile(f); }} />
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">You can skip this and add a photo later.</p>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-display font-bold">Your bio & interests</h2>
              <p className="text-sm text-muted-foreground mt-1">Tell us what makes you, you.</p>

              <div className="mt-5">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Short bio</p>
                  <span className="text-xs text-muted-foreground">{bio.length}/150</span>
                </div>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 150))}
                  placeholder="Coffee addict, dog parent, weekend hiker."
                  rows={3}
                />
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Interests <span className="text-muted-foreground/70 normal-case">({interests.length}/12)</span></p>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((i) => {
                    const active = interests.includes(i);
                    return (
                      <button key={i} type="button" onClick={() => toggleInterest(i)}
                        className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${active ? 'bg-gradient-brand text-primary-foreground border-transparent shadow-glow' : 'border-border hover:border-primary/50'}`}>
                        {i}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Religion */}
              <div className="mt-5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Religion <span className="text-muted-foreground/70 normal-case">(optional)</span></p>
                <Select value={religion} onValueChange={setReligion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your religion" />
                  </SelectTrigger>
                  <SelectContent>
                    {RELIGIONS.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Languages */}
              <div className="mt-5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                  Language 🌐 <span className="text-muted-foreground/70 normal-case">(optional, multi-select)</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((l) => {
                    const active = languages.includes(l);
                    return (
                      <button key={l} type="button" onClick={() => toggleLanguage(l)}
                        className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${active ? 'bg-gradient-brand text-primary-foreground border-transparent shadow-glow' : 'border-border hover:border-primary/50'}`}>
                        {l}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Location */}
              <div className="mt-5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Location 📍 <span className="text-muted-foreground/70 normal-case">(optional)</span></p>
                <div className="flex gap-2">
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Delhi, India"
                  />
                  <Button type="button" variant="secondary" onClick={detectLocation} disabled={detectingLocation} className="gap-1 shrink-0">
                    {detectingLocation ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                    <span className="hidden sm:inline">Detect</span>
                  </Button>
                </div>
              </div>

              {/* Relationship Status */}
              <div className="mt-5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Relationship Status 💑 <span className="text-muted-foreground/70 normal-case">(optional)</span></p>
                <Select value={relationshipStatus} onValueChange={setRelationshipStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your status" />
                  </SelectTrigger>
                  <SelectContent>
                    {RELATIONSHIP_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8">
            <Button variant="ghost" onClick={() => setStep((s) => Math.max(s - 1, 0))} disabled={step === 0 || saving} className="gap-1">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            {step < totalSteps - 1 ? (
              <Button onClick={next} className="bg-gradient-brand text-primary-foreground gap-1 shadow-glow">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={finish} disabled={saving} className="bg-gradient-brand text-primary-foreground gap-1 shadow-glow">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Finish <Sparkles className="h-4 w-4" /></>}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
