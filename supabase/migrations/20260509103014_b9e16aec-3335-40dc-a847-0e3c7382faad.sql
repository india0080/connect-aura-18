-- ============ WALLETS ============
CREATE TABLE public.wallets (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  coins BIGINT NOT NULL DEFAULT 0 CHECK (coins >= 0),
  bonus_coins BIGINT NOT NULL DEFAULT 0 CHECK (bonus_coins >= 0),
  total_recharged BIGINT NOT NULL DEFAULT 0,
  total_spent BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own wallet" ON public.wallets FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own wallet" ON public.wallets FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_wallets_updated BEFORE UPDATE ON public.wallets FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ COIN TRANSACTIONS (LEDGER) ============
CREATE TYPE public.coin_tx_type AS ENUM ('recharge','spend','bonus','reward','refund','referral','vip_bonus');
CREATE TABLE public.coin_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type public.coin_tx_type NOT NULL,
  coins BIGINT NOT NULL,
  bonus_coins BIGINT NOT NULL DEFAULT 0,
  balance_after BIGINT NOT NULL,
  description TEXT,
  reference_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.coin_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own tx" ON public.coin_transactions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE INDEX idx_coin_tx_user ON public.coin_transactions(user_id, created_at DESC);

-- ============ RECHARGE PACKAGES ============
CREATE TABLE public.recharge_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  coins BIGINT NOT NULL,
  bonus_percent INT NOT NULL DEFAULT 0,
  price_inr INT NOT NULL,
  badge TEXT,
  highlight BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.recharge_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone view packages" ON public.recharge_packages FOR SELECT TO authenticated USING (active = true);
CREATE POLICY "Admins manage packages" ON public.recharge_packages FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ============ VIP PLANS ============
CREATE TABLE public.vip_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tier TEXT NOT NULL,
  duration_days INT NOT NULL,
  price_inr INT NOT NULL,
  bonus_coins BIGINT NOT NULL DEFAULT 0,
  perks JSONB NOT NULL DEFAULT '[]',
  badge TEXT,
  highlight BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.vip_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone view plans" ON public.vip_plans FOR SELECT TO authenticated USING (active = true);
CREATE POLICY "Admins manage plans" ON public.vip_plans FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ============ VIP SUBSCRIPTIONS ============
CREATE TABLE public.vip_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.vip_plans(id),
  tier TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  payment_ref TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.vip_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own subs" ON public.vip_subscriptions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE INDEX idx_vip_user_active ON public.vip_subscriptions(user_id, expires_at DESC);

-- ============ DAILY CHECKINS ============
CREATE TABLE public.daily_checkins (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INT NOT NULL DEFAULT 0,
  longest_streak INT NOT NULL DEFAULT 0,
  last_claimed_date DATE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.daily_checkins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own checkin" ON public.daily_checkins FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER trg_checkins_updated BEFORE UPDATE ON public.daily_checkins FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.daily_reward_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day_index INT NOT NULL,
  coins_awarded BIGINT NOT NULL,
  claimed_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, claimed_date)
);
ALTER TABLE public.daily_reward_claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own claims" ON public.daily_reward_claims FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ============ SPIN HISTORY ============
CREATE TABLE public.spin_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prize_coins BIGINT NOT NULL,
  prize_label TEXT,
  spun_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, spun_date)
);
ALTER TABLE public.spin_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own spins" ON public.spin_history FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ============ REFERRALS ============
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reward_coins BIGINT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (referred_id)
);
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own referrals" ON public.referrals FOR SELECT TO authenticated USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

-- ============ PAYMENT ORDERS ============
CREATE TABLE public.payment_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,
  package_id UUID REFERENCES public.recharge_packages(id),
  vip_plan_id UUID REFERENCES public.vip_plans(id),
  amount_inr INT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  provider TEXT NOT NULL DEFAULT 'stripe',
  provider_session_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.payment_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own orders" ON public.payment_orders FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER trg_orders_updated BEFORE UPDATE ON public.payment_orders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ ATOMIC WALLET ADJUST (SECURITY DEFINER) ============
CREATE OR REPLACE FUNCTION public.adjust_wallet(
  _user_id UUID,
  _coins BIGINT,
  _bonus_coins BIGINT,
  _type public.coin_tx_type,
  _description TEXT,
  _reference TEXT DEFAULT NULL,
  _metadata JSONB DEFAULT '{}'
) RETURNS public.wallets
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  w public.wallets;
  new_balance BIGINT;
BEGIN
  INSERT INTO public.wallets(user_id) VALUES (_user_id)
    ON CONFLICT (user_id) DO NOTHING;

  UPDATE public.wallets
    SET coins = coins + _coins,
        bonus_coins = bonus_coins + _bonus_coins,
        total_recharged = total_recharged + GREATEST(_coins,0) * (CASE WHEN _type = 'recharge' THEN 1 ELSE 0 END),
        total_spent = total_spent + GREATEST(-_coins,0) * (CASE WHEN _type = 'spend' THEN 1 ELSE 0 END)
    WHERE user_id = _user_id
    RETURNING * INTO w;

  IF w.coins < 0 THEN
    RAISE EXCEPTION 'INSUFFICIENT_COINS';
  END IF;

  new_balance := w.coins + w.bonus_coins;

  INSERT INTO public.coin_transactions(user_id, type, coins, bonus_coins, balance_after, description, reference_id, metadata)
    VALUES (_user_id, _type, _coins, _bonus_coins, new_balance, _description, _reference, COALESCE(_metadata,'{}'));

  RETURN w;
END;
$$;

REVOKE ALL ON FUNCTION public.adjust_wallet(UUID,BIGINT,BIGINT,public.coin_tx_type,TEXT,TEXT,JSONB) FROM PUBLIC, anon, authenticated;

-- ============ SEED DATA ============
INSERT INTO public.recharge_packages (name, coins, bonus_percent, price_inr, badge, highlight, sort_order) VALUES
  ('Starter Pack', 500, 20, 99, NULL, false, 1),
  ('Popular Pack', 1200, 25, 199, 'Most Popular', true, 2),
  ('Silver Pack', 2500, 30, 399, NULL, false, 3),
  ('Gold Pack', 5000, 40, 699, 'Best Value', false, 4),
  ('Diamond Pack', 12000, 50, 1499, 'Limited Offer', false, 5),
  ('Ultra VIP Pack', 25000, 70, 2999, 'Elite', false, 6);

INSERT INTO public.vip_plans (name, tier, duration_days, price_inr, bonus_coins, perks, badge, highlight, sort_order) VALUES
  ('VIP Weekly', 'weekly', 7, 199, 500, '["Free daily messages","Audio call discount","Premium badge"]', NULL, false, 1),
  ('VIP Monthly', 'monthly', 30, 699, 2500, '["Free daily messages","Audio & video discount","Top profile boost","Premium badge","Read receipts"]', 'Recommended', true, 2),
  ('VIP Gold', 'gold', 90, 1499, 7000, '["All Monthly perks","Random match priority","Profile visitors","Advanced filters"]', NULL, false, 3),
  ('VIP Platinum', 'platinum', 180, 2999, 15000, '["All Gold perks","Unlimited likes","Exclusive chat themes","Extra coin bonus"]', NULL, false, 4),
  ('VIP Diamond', 'diamond', 365, 4999, 35000, '["All Platinum perks","VIP-only support","2X daily rewards","Diamond badge"]', 'Best Value', false, 5);
