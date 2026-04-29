import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Loader2, LogOut, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { GENDERS, INTERESTS, PREFERENCES } from '@/lib/constants';
import { PageMeta } from '@/components/common/PageMeta';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { VerificationStatus } from '@/components/profile/VerificationStatus';
import type { Gender, Preference } from '@/types';

export default function ProfilePage() {
  const { user, profile, refreshProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const fileInput = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [preference, setPreference] = useState<Preference | ''>('');
  const [interests, setInterests] = useState<string[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setFullName(profile.full_name);
    setBio(profile.bio ?? '');
    setGender((profile.gender ?? '') as Gender | '');
    setPreference((profile.preference ?? '') as Preference | '');
    setInterests(profile.interests ?? []);
  }, [profile]);

  const onPick = (f: File) => {
    if (!f.type.startsWith('image/')) { toast.error('Pick an image'); return; }
    if (f.size > 5 * 1024 * 1024) { toast.error('Max 5 MB'); return; }
    setAvatarFile(f); setAvatarPreview(URL.createObjectURL(f));
  };

  const toggleInt = (i: string) => setInterests((p) => p.includes(i) ? p.filter((x) => x !== i) : p.length < 12 ? [...p, i] : p);

  const save = async () => {
    if (!user) return;
    if (fullName.trim().length < 2) { toast.error('Name too short'); return; }
    setSaving(true);
    try {
      let avatar_url = profile?.avatar_url ?? null;
      if (avatarFile) {
        const ext = avatarFile.name.split('.').pop() || 'jpg';
        const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage.from('avatars').upload(path, avatarFile, { upsert: true });
        if (upErr) throw upErr;
        avatar_url = supabase.storage.from('avatars').getPublicUrl(path).data.publicUrl;
      }
      const { error } = await supabase.from('profiles').update({
        full_name: fullName.trim(),
        bio: bio.trim(),
        gender: (gender || null) as Gender | null,
        preference: (preference || null) as Preference | null,
        interests, avatar_url,
      }).eq('id', user.id);
      if (error) throw error;
      await refreshProfile();
      setAvatarFile(null); setAvatarPreview(null);
      toast.success('Profile saved');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save');
    } finally { setSaving(false); }
  };

  const deleteAccount = async () => {
    if (!user) return;
    // Profile delete cascades via auth.users FK only on profile, not the auth user.
    // Best-effort: clear data; full account deletion requires an admin call.
    const { error } = await supabase.from('profiles').delete().eq('id', user.id);
    if (error) { toast.error(error.message); return; }
    await signOut();
    toast.success('Profile data removed.');
    navigate('/login', { replace: true });
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto w-full">
      <PageMeta title="Profile — GoMilap" />
      <h1 className="text-2xl md:text-3xl font-display font-bold">Your profile</h1>
      <p className="text-muted-foreground text-sm mt-1">Update how others see you on GoMilap.</p>

      <div className="glass rounded-2xl p-6 mt-6 space-y-5">
        <div className="flex items-center gap-4">
          <button onClick={() => fileInput.current?.click()} className="relative group">
            <Avatar className="h-20 w-20 ring-2 ring-border">
              <AvatarImage src={avatarPreview ?? profile?.avatar_url ?? undefined} />
              <AvatarFallback className="bg-gradient-brand text-primary-foreground text-xl">{profile?.full_name?.[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="absolute inset-0 rounded-full bg-background/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <Camera className="h-5 w-5" />
            </span>
          </button>
          <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onPick(f); }} />
          <div>
            <p className="font-semibold">{profile?.full_name}</p>
            <p className="text-sm text-muted-foreground">{profile?.email}</p>
            <p className="text-xs text-muted-foreground mt-1">Click photo to change</p>
          </div>
        </div>

        <div>
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">Full name</Label>
          <Input className="mt-1.5" value={fullName} onChange={(e) => setFullName(e.target.value)} maxLength={80} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Bio</Label>
            <span className="text-xs text-muted-foreground">{bio.length}/150</span>
          </div>
          <Textarea value={bio} onChange={(e) => setBio(e.target.value.slice(0, 150))} rows={3} />
        </div>

        <div>
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">I am</Label>
          <div className="grid grid-cols-2 gap-2 mt-1.5">
            {GENDERS.map((g) => (
              <button key={g.value} type="button" onClick={() => setGender(g.value)}
                className={`px-3 py-2 rounded-xl border text-sm transition ${gender === g.value ? 'border-primary bg-gradient-brand-soft' : 'border-border hover:border-primary/50'}`}>
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">Looking to meet</Label>
          <div className="grid grid-cols-3 gap-2 mt-1.5">
            {PREFERENCES.map((p) => (
              <button key={p.value} type="button" onClick={() => setPreference(p.value)}
                className={`px-3 py-2 rounded-xl border text-sm transition ${preference === p.value ? 'border-primary bg-gradient-brand-soft' : 'border-border hover:border-primary/50'}`}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">Interests <span className="normal-case text-muted-foreground/70">({interests.length}/12)</span></Label>
          <div className="flex flex-wrap gap-2 mt-1.5">
            {INTERESTS.map((i) => {
              const a = interests.includes(i);
              return (
                <button key={i} type="button" onClick={() => toggleInt(i)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border ${a ? 'bg-gradient-brand text-primary-foreground border-transparent' : 'border-border hover:border-primary/50'}`}>{i}</button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={save} disabled={saving} className="bg-gradient-brand text-primary-foreground shadow-glow">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save changes'}
          </Button>
          <Button variant="ghost" onClick={() => { signOut(); navigate('/login'); }} className="gap-1.5">
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </div>

      {user && <VerificationStatus user={user} profile={profile} />}

      <div className="glass rounded-2xl p-6 mt-6 border border-destructive/30">
        <h3 className="font-semibold text-destructive flex items-center gap-2"><Trash2 className="h-4 w-4" /> Danger zone</h3>
        <p className="text-sm text-muted-foreground mt-1">Permanently delete your profile data. This cannot be undone.</p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="mt-4">Delete profile data</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete your profile?</AlertDialogTitle>
              <AlertDialogDescription>This will permanently remove your profile, requests and messages. You'll be signed out.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteAccount} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
