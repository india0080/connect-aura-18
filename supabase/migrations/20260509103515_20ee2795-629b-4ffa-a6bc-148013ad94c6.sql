ALTER TABLE public.recharge_packages ADD COLUMN stripe_price_id TEXT;
ALTER TABLE public.vip_plans ADD COLUMN stripe_price_id TEXT;

UPDATE public.recharge_packages SET stripe_price_id = 'coins_starter_inr' WHERE name = 'Starter Pack';
UPDATE public.recharge_packages SET stripe_price_id = 'coins_popular_inr' WHERE name = 'Popular Pack';
UPDATE public.recharge_packages SET stripe_price_id = 'coins_silver_inr' WHERE name = 'Silver Pack';
UPDATE public.recharge_packages SET stripe_price_id = 'coins_gold_inr' WHERE name = 'Gold Pack';
UPDATE public.recharge_packages SET stripe_price_id = 'coins_diamond_inr' WHERE name = 'Diamond Pack';
UPDATE public.recharge_packages SET stripe_price_id = 'coins_ultra_inr' WHERE name = 'Ultra VIP Pack';

UPDATE public.vip_plans SET stripe_price_id = 'vip_weekly_inr' WHERE tier = 'weekly';
UPDATE public.vip_plans SET stripe_price_id = 'vip_monthly_inr' WHERE tier = 'monthly';
UPDATE public.vip_plans SET stripe_price_id = 'vip_gold_inr' WHERE tier = 'gold';
UPDATE public.vip_plans SET stripe_price_id = 'vip_platinum_inr' WHERE tier = 'platinum';
UPDATE public.vip_plans SET stripe_price_id = 'vip_diamond_inr' WHERE tier = 'diamond';