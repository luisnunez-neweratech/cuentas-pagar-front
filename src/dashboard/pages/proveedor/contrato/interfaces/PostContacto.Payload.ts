export interface PostContactoPayload {
  id: number;
  supplierId: number;
  contactType: number;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  isActive: boolean | null;
}
