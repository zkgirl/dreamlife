import { useCallback } from 'react';
import { soundManager, SoundType } from '@/utils/soundManager';

export function useSoundEffects() {
  const playSound = useCallback((soundType: SoundType, volume?: number) => {
    soundManager.play(soundType, volume);
  }, []);

  return {
    playSound,
    playButtonClick: useCallback(() => soundManager.play('button_click'), []),
    playMenuOpen: useCallback(() => soundManager.play('menu_open'), []),
    playMenuClose: useCallback(() => soundManager.play('menu_close'), []),
    playTabSwitch: useCallback(() => soundManager.play('tab_switch'), []),
    playAgeUp: useCallback(() => soundManager.play('age_up'), []),
    playStatIncrease: useCallback(() => soundManager.play('stat_increase'), []),
    playStatDecrease: useCallback(() => soundManager.play('stat_decrease'), []),
    playMoneyGain: useCallback(() => soundManager.play('money_gain'), []),
    playMoneyLoss: useCallback(() => soundManager.play('money_loss'), []),
    playPurchase: useCallback(() => soundManager.play('purchase'), []),
    playSell: useCallback(() => soundManager.play('sell'), []),
    playRelationshipIncrease: useCallback(() => soundManager.play('relationship_increase'), []),
    playRelationshipDecrease: useCallback(() => soundManager.play('relationship_decrease'), []),
    playNewRelationship: useCallback(() => soundManager.play('new_relationship'), []),
    playBreakup: useCallback(() => soundManager.play('breakup'), []),
    playGift: useCallback(() => soundManager.play('gift'), []),
    playArgument: useCallback(() => soundManager.play('argument'), []),
    playEventPopup: useCallback(() => soundManager.play('event_popup'), []),
    playEventPositive: useCallback(() => soundManager.play('event_positive'), []),
    playEventNegative: useCallback(() => soundManager.play('event_negative'), []),
    playJobOffer: useCallback(() => soundManager.play('job_offer'), []),
    playPromotion: useCallback(() => soundManager.play('promotion'), []),
    playFired: useCallback(() => soundManager.play('fired'), []),
    playBusinessStart: useCallback(() => soundManager.play('business_start'), []),
    playBusinessSuccess: useCallback(() => soundManager.play('business_success'), []),
    playBusinessFail: useCallback(() => soundManager.play('business_fail'), []),
    playAchievement: useCallback(() => soundManager.play('achievement'), []),
    playDeath: useCallback(() => soundManager.play('death'), []),
    playBirth: useCallback(() => soundManager.play('birth'), []),
    playGraduation: useCallback(() => soundManager.play('graduation'), []),
  };
}
