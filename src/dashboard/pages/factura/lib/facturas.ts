export const getFacturaId = (itemName: string, facturasStatus: any[]): any => {
  if (facturasStatus && facturasStatus.length > 0) {
    const factura = facturasStatus.find(
      (f) => f.itemName.toLowerCase() === itemName.toLowerCase(),
    );
    return factura ? factura.id : null;
  } else {
    return null;
  }
};
