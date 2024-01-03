import { CanDeactivateFn } from '@angular/router';
import { MemberProfileComponent } from '../members/member-profile/member-profile.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberProfileComponent> = (component, currentRoute, currentState, nextState) => {
  if (component.profileForm?.dirty) {
    return confirm('Are you sure? any unsaved change will be lost!')
  }
  return true;
};
