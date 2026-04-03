export interface User {
  id: string;
  name: string;
  phone: string;
  avatarUrl: string | null;
}

export interface SettingsMenuItem {
  id: string;
  label: string;
  icon: string;
  onPress?: () => void;
}
