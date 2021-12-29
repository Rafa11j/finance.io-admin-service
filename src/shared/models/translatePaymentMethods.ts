export const translatePaymentType = (type: string): string => {
  const variant = {
    CREDIT_CARD: 'Cartão de crédito',
    DEBIT_CARD: 'Cartão de débito',
    PIX: 'PIX',
    BANK_SLIP: 'Boleto bancário',
    MONEY: 'Dinheiro',
  };
  return variant[type];
};
