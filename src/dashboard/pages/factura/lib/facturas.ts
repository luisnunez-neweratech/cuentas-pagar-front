export const getFacturaId = (itemName: string, facturasStatus: any[]): any => {
  const factura = facturasStatus.find(
    (f) => f.itemName.toLowerCase() === itemName.toLowerCase(),
  );
  return factura ? factura.id : null;
};
