import { Occasion } from "./temple.model";

export class ReferenceData {
    public static readonly DEFAULT_OCCASIONS: Occasion[] = [
        {value: 'MSRP', viewValue: 'Maha Sivarathri Poojai'},
        {value: 'MDP', viewValue: 'Mandala Poojai'},
        {value: 'VIL', viewValue: 'Vilakku Poojai'},
        {value: 'VAR', viewValue: 'Varushabisegam'},
        {value: 'LAK', viewValue: 'Laksharchanai'},
        {value: 'KUB', viewValue: 'Kumbabisegam'},
        {value: 'TKP', viewValue: 'Thiru Karthigai Poojai'},
        {value: 'SP', viewValue: 'Special Poojai'},
        {value: 'RP', viewValue: 'Regular Poojai'},
        {value: 'GEN', viewValue: 'General'},
      ];
    
      public static readonly DEFAULT_PAYMENT_TYPES=['Tax','Donation','Hundiyal','Poojai'];
      public static readonly DEFAULT_PAYMENT_MODES=['Cash','UPI','Bank'];
      public static readonly DEFAULT_FINANCIAL_YEARS = ['2024-2025','2023-2024','2022-2023'];
  }