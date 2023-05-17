export interface ruleType {
  rangeMin: number;
  rangeMax: number;
  tax: number;
  fixNumber?: boolean;
  link?: string;
}

export interface taxRuleType {
  code: string;
  nation: string;
  name: string;
  rule: ruleType[],
}

export const taxRule: taxRuleType[] = [
  {
    code: 'JPY',
    nation: '日本',
    name: '日圓',
    rule: [
      {
        rangeMin: 5000,
        rangeMax: -1,
        tax: 0.1,
      }
    ]
  },
  {
    code: 'THB',
    nation: '泰國',
    name: '泰銖',
    rule: [
      {
        rangeMin: 2000,
        rangeMax: 199999,
        tax: 0.1,
        fixNumber: true,
        link: 'https://vrtweb.rd.go.th/80.html',
      },
      {
        rangeMin: 200000,
        rangeMax: -1,
        tax: 0.061,
      },
    ]
  },
  {
    code: 'DKK',
    nation: '丹麥',
    name: '丹麥克朗',
    rule: [
      {
        rangeMin: 300,
        rangeMax: 4000,
        tax: 0.118,
      },
      {
        rangeMin: 4001,
        rangeMax: 15000,
        tax: 0.135,
      },
      {
        rangeMin: 15001,
        rangeMax: 25000,
        tax: 0.16,
      },
      {
        rangeMin: 25001,
        rangeMax: -1,
        tax: 0.175,
      },
    ]
  },
  {
    code: 'NOK',
    nation: '挪威',
    name: '挪威克朗',
    rule: [
      {
        rangeMin: 315,
        rangeMax: 10000,
        tax: 0.13,
      },
      {
        rangeMin: 10001,
        rangeMax: 20000,
        tax: 0.16,
      },
      {
        rangeMin: 20001,
        rangeMax: 50000,
        tax: 0.17,
      },
      {
        rangeMin: 50001,
        rangeMax: 100000,
        tax: 0.18,
      },
      {
        rangeMin: 100001,
        rangeMax: -1,
        tax: 0.19,
      },
    ]
  },
  {
    code: 'EUR',
    nation: '法國',
    name: '歐元',
    rule: [
      {
        rangeMin: 175.01,
        rangeMax: -1,
        tax: 0.12,
      }
    ]
  },
]