const template = [
  {
    title: "Business Information",
    items: [
      {
        model: "company_name",
        label: "Name of Company",
        title: "1. Name of Company",
        type: 2,
      },
      {
        model: "company_address",
        label: "Address of primary office",
        title: "2. Address of primary office",
        type: 2,
      },
      {
        model: "type_entity",
        label: "type of entity(corporation, partnership, etc.)",
        title: "3. type of entity",
        type: 2,
      },
      {
        model: "primary_contact",
        label: "Primary Contact(for this disclosure)",
        title: "4. Primary Contact",
        type: 2,
      },
      {
        title: "5. Reporting and V oluntary Commitments:",
        items: [
          {
            title:
              "a. Do you publish a report on your ESG/Sustainability policies and operations? Y/N If yes, please attach or provide a link.",
            type: 0,
            model: "reportESG_5a",
            label: "If yes, please attach or provide a link.",
          },
          {
            title:
              "b. Do you participate in and report to any of the following entities?",
            items: [
              {
                title: "i. Global Reporting Initiative (GRI)",
                model: "reportGRI_5b1",
                type: 1,
                label: "YES",
              },
              {
                title: "ii. Carbon Disclosure Project (CDP)",
                model: "reportCDP_5b2",
                type: 1,
                label: "YES",
              },
              {
                title:
                  "iii. International Organization for Standardization (ISO; specify which categories))",
                model: "reportISO_5b3",
                type: 1,
                label: "YES",
              },
              {
                title: "iv. Sustainability Accounting Standards Board (SASB)",
                model: "reportSASB_5b4",
                type: 1,
                label: "YES",
              },
              {
                title: "v. United Nations Global Compact",
                model: "reportUNGC5b5",
                type: 1,
                label: "YES",
              },
              {
                title: "vi. EcoVadis Business Sustainability Ratings",
                model: "reportGRI_5b6",
                type: 1,
                label: "YES",
              },
              {
                title: "vii. Other",
                model: "reportOther_5b7",
                type: 1,
                label: "YES",
              },
            ],
          },
          {
            title:
              "c. Have you obtained any third-party verification/Certification or assurance on any aspect of your ESG performance based on a recognized international or national standard? Y/N",
            type: 0,
            model: "reportESG_5c",
            label: "If so, describe.",
          },
        ],
      },
      {
        title:
          "6. Do you have a published Business Code of Conduct? (e.g., commitments made voluntarily by companies that put forth standards and principles directing behavior in the marketplace.)",
        type: 0,
        model: "reportPBCC_6",
        label: "If yes, please attach or provide a link.",
      },
      {
        title:
          "7. Describe the leadership and governance structure for your ESG activities, including board-level involvement.",
        type: 0,
        model: "reportESG_7",
        label: "If yes, please attach or provide a link.",
      },
      {
        title:
          "8. Are you subject to internal and/or external audits on any element of ESG? Y/N",
        type: 0,
        model: "reportESG_8",
        label: "If yes, please attach or provide a link.",
      },
    ],
  },
  {
    title:
      "Anti-Bribery and Corruption, Anti-Money Laundering and Anti-Tax Evasion:",
    items: [
      {
        title:
          "9. Are you and your employees compliant with all applicable anti-bribery and corruption, anti-tax evasion and facilitation, anti-money laundering or terrorist financing, insider dealing, conflicts of interest, economic sanctions, and anti-competitive activities laws or regulations (together the “Control Areas”)? Y/N",
        type: 0,
        label: "If no, please provide further details of any non-compliance.",
        model: "reportABCMT_9",
      },
      {
        title:
          "10. Have there been any instances of non-compliance with applicable legislation or regulation relating to the Control Areas by you or any of your employees at any point in the last 3 years? Y/N",
        type: 0,
        label: "If yes, please provide further details.",
        model: "reportABCMT_10",
      },
      {
        title:
          "11. Have you or any of your employees been the subject of any investigation, proceeding or enforcement action in respect of any of the Control Areas in the last 3 years? Y/N ",
        type: 0,
        label: "If yes, please provide further details.",
        model: "reportABCMT_11",
      },
      {
        title:
          "12. Have you or any of your employees been suspended or debarred from doing business in any capacity anywhere in the world, or is such suspension or debarment currently under consideration? Y/N",
        type: 0,
        label: "If yes, please provide further details.",
        model: "reportABCMT_12",
      },
      {
        title:
          "13. Are you, any entities in your group of companies or any of your employees subject to any economic sanctions regime? Y/N",
        type: 0,
        label: "If yes, please provide further details.",
        model: "reportABCMT_13",
      },
      {
        title:
          "14. Do you have policies covering the Control Areas? If so, please attach a copy of each policy and confirm when it was last reviewed or updated. Y/N",
        type: 0,
        label:
          "If not, please provide information on what you are doing to address this",
        model: "reportABCMT_14",
      },
      {
        title:
          "15. Have there been any instances of material non-compliance with those policies in the last 12 months? Y/N",
        type: 0,
        label:
          " If so, please provide details. If this does not apply to you, please respond N/A.",
        model: "reportABCMT_15",
      },
      {
        title:
          "16. Does your anti-bribery and corruption policy prohibit facilitation payments? Y/N",
        type: 0,
        label: "If you do not have such a policy, please respond N/A.",
        model: "reportABCMT_16",
      },
      {
        title: "17. Do you have a whistleblowing policy? Y/N",
        type: 0,
        label: "If yes, please attach a copy.",
        model: "reportABCMT_17",
      },
      {
        title:
          "18. Do you have a hospitality, gifts and entertainment policy? Y/N",
        type: 0,
        label: "If yes, please attach a copy.",
        model: "reportABCMT_18",
      },
      {
        title:
          "19. Have you identified jurisdictions, in which you operate that present a heightened risk in any of the Control Areas? Y/N",
        type: 0,
        label: "If yes, please provide details.",
        model: "reportABCMT_19",
      },
      {
        title:
          "20. Do you take steps, such as requiring additional training or certification or conducting additional due diligence, to enhance controls in high risk jurisdictions? Y/N",
        type: 1,
        label: "YES",
        model: "reportABCMT_20",
      },
      {
        title:
          "21. Do you have a strategy and/or policy for mitigating any risks associated with negotiating or otherwise dealing with public officials? Y/N",
        type: 0,
        label: "If yes, please provide details.",
        model: "reportABCMT_21",
      },
      {
        title:
          "22. Have you or any third party acting on your behalf made contributions to or for the benefit of any political party, public official or election campaign in the last 3 years? Y/N",
        type: 0,
        label: "If yes, please provide details.",
        model: "reportABCMT_22",
      },
      {
        title: "23. Do you make cash payments to third parties? Y/N ",
        type: 0,
        label:
          "if yes, please provide details regarding to whom such payments would be made and why, and what controls are in place regarding such payments. Y/N",
        model: "reportABCMT_23",
      },
      {
        title:
          "24. Do you require your contractors, sub-contractors and suppliers to comply with applicable legislation and regulation and have policies in place regarding the Control Areas?",
        type: 0,
        label: "If yes, please provide details.",
        model: "reportABCMT_24",
      },
      {
        title:
          "25. Do you include a contractual right of termination for breach of applicable legislation and regulation regarding any of the Control Areas in your agreements with your contractors, sub-contractors and suppliers? Y/N",
        type: 0,
        label: "If yes, please provide details.",
        model: "reportABCMT_25",
      },
    ],
  },
  {
    title: "Environmental Disclosures",
    items: [
      {
        title: "26. Do you have any of the following: (If yes, please attach.)",
        items: [
          {
            title: "a. A published environmental policy? Y/N",
            type: 1,
            label: "YES",
            model: "reportED_26a",
          },
          {
            title: "b. A published climate change risk management policy? Y/N",
            type: 1,
            label: "YES",
            model: "reportED_26b",
          },
        ],
      },
      {
        title:
          "27. Do you have an environmental management system in place to reduce carbon emissions, energy usage, water and/or waste? Y/N",
        items: [
          {
            title: "c. If yes, please describe.",
            type: 0,
            model: "reportED_27c",
          },
        ],
      },
      {
        title:
          "28. Do you hold any environmental certification for your operations and/or products, e.g. ISO 14001, Energy Star, GreenLeaf, LEED, etc? Y/N",
        items: [
          {
            title:
              "d. If yes, please provide the certificates and list the locations or products that are certified.",
            type: 0,
            model: "reportED_28d",
          },
        ],
      },
      {
        title: "29. Do you measure your carbon emissions? Y/N",
        items: [
          {
            title:
              "e. Have you achieved any reductions? Y/N If yes, please describe.",
            type: 0,
            model: "reportED_29e",
          },
          {
            title:
              "f. Have you set emissions reduction targets? Y/N If yes, please describe.",
            type: 0,
            model: "reportED_29f",
          },
          {
            title:
              "g. Do you report on your carbon emissions? Y/N If yes, please describe.",
            type: 0,
            model: "reportED_29g",
          },
        ],
      },
      {
        title:
          "30. Are your operations subject to any local, regional or national environmental permits? Y/N",
        type: 0,
        model: "reportED_30",

        label: "If yes, are your permits in full force and effect?",
      },
      {
        title:
          "31. Have you been subject to any investigation, claim, notice or order related to the use, storage, disposal or transportation of hazardous substances? Y/N",
        type: 0,
        model: "reportED_31",

        label: "If yes, please provide details.",
      },
    ],
  },
  {
    title: "Laborand Social",
    items: [
      {
        title:
          "32. Do you have published policies or guidance for employees relating to your employment practices, company culture and workplace behavior [For example, employee handbook, anti-harassment policy, anti-discrimination policy, violence in the workplace, EEO policy or plan, fair wages policy] Y/N ",
        type: 0,
        label: "If yes, please specify and attach a copy.",
        model: "reportLS_32",
      },
      {
        title:
          "33. Do you have processes in place to ensure you follow international good practices in countries in which you operate where national labor laws do not exist or are weakly enforced? Y/N",
        type: 1,
        label: "YES",
        model: "reportLS_33",
      },
      {
        title:
          "34. Do you undertake pre-employment background checks of your employees and contractors and also during employment? Y/N",
        type: 0,
        label: "If yes, please describe",
        model: "reportLS_34",
      },
      {
        title:
          "35. Do you have a published Health & Safety and/or Social Well-Being Policy? Y/N",
        type: 0,
        label: "If yes, please attach a copy.",
        model: "reportLS_35",
      },
      {
        title:
          "36. Do you comply with all applicable Health & Safety laws or codes of practice in the countries/jurisdictions where you operate? Y/N",
        type: 1,
        label: "YES",
        model: "reportLS_36",
      },
      {
        title:
          "37. How many reported accidents and workplace related injuries or deaths have there been in the past 12 months?",
        type: 2,
        model: "reportLS_37",
      },
      {
        title:
          "38. Do you consider yourself a Women-owned, Minority, Disadvantaged or Small Business Enterprise? Y/N",
        type: 1,
        label: "YES",
        model: "reportLS_38",
      },
      {
        title:
          "39. Do you have a published human rights policy or statement? Y/N",
        items: [
          {
            title:
              "h. Are you required to comply with or have a policy stating voluntary compliance with any legislation or regulation in relation to anti-slavery and anti-human trafficking, e.g., the UK Modern Slavery Act, California Transparency in Supply Chains Act, or the US Federal Acquisition Regulation Final Rule on Combatting Trafficking in Persons? Y/N",
            type: 1,
            label: "YES",
            model: "reportLS_39h",
          },
          {
            title:
              "i. If yes, please attach a copy of the policy and describe your compliance requirements (including copies of any relevant reporting).",
            type: 0,
            model: "reportLS_39i",
          },
        ],
      },
      {
        title:
          "40. Do you conduct human rights due diligence to identify human rights risks and impacts in your operations? Y/N",
        type: 0,
        label: "If yes, please describe",
        model: "reportLS_40",
      },
      {
        title:
          "41. Do you employ low-skilled foreign or domestic migrant workers? Y/N",
        items: [
          {
            title:
              "a. If yes, do you use external recruiters or do you recruit directly?",
            type: 1,
            label: "YES",
            model: "reportLS_41",
          },
        ],
      },
      {
        title:
          "42. Do you formally screen and evaluate prospective recruiters to determine if (i) they operate in compliance with the law and your policies; and (ii) observe the “employer pays” principle of not charging any recruitment fees to workers? Y/N",
        type: 1,
        label: "YES",
        model: "reportLS_42",
      },
      {
        title:
          "43. Do you have an internal grievance mechanism for employees and contractors? Y/N",
        type: 0,
        label: "If yes, please describe.",
        model: "reportLS_43",
      },
      {
        title:
          "44. Is there a procedure in place for employees to make confidential complaints or reports, including about sexual harassment? Y/N",
        type: 0,
        label: "If yes, please describe.",
        model: "reportLS_44",
      },
      {
        title:
          "45. Do you provide a channel for community members and other non-employee individua ls to raise a grievance with the company? Y/N",
        type: 0,
        label: "If yes, please describe.",
        model: "reportLS_45",
      },
      {
        title:
          "46. Do you engage strategically or proactively with external stakeholders on human rights issues outside of grievance processes? Y/N",
        type: 0,
        label: "If yes, please describe.",
        model: "reportLS_46",
      },
      {
        title:
          "47. Have any negative human rights impacts from your operations or your supply chain been identified in the past 5 years? Y/N If",
        type: 0,
        label: "If so, what actions did you take?",
        model: "reportLS_47",
      },
      {
        title: "48. Do you have any of the following: (If yes, please attach)",
        items: [
          {
            title: "j. Supplier [Business] Code of Conduct? Y/N",
            type: 0,
            model: "reportLS_48a",
          },
          {
            title:
              "k. Sustainable Procurement Policy that addresses ESG issues? Y/N",
            type: 0,
            model: "reportLS_48k",
          },
        ],
      },
      {
        title:
          " 49. Do you have a supplier engagement program, due diligence or auditing program for environmental, health & safety and/or human rights performance? Y/N",
        type: 0,
        label: "If yes, please describe.",
        model: "reportLS_49",
      },
      {
        title:
          "50. Do you provide training on how to mitigate slavery and human rights risks for employee s who are responsible for your supply chain management? Y/N",
        type: 1,
        label: "YES",
        model: "reportLS_50",
      },
      {
        title:
          "51. Does your agreement with suppliers require them to certify:",
        items: [
          {
            title:
              "a. compliance with applicable slavery and human trafficking laws of the country or countries in which they operate? Y/N",
            type: 1,
            label: "YES",
            model: "reportLS_51a",
          },
          {
            title:
              "b. that materials used in their products comply with applicable slavery and human trafficking laws of the country or countries in which they operate? Y/N",
            type: 1,
            label: "YES",
            model: "reportLS_51b",
          },
        ],
      },
      {
        title:
          "52. Do you include a contractual right of termination for breach of applicable human rights and labor laws in agreements with your contractors, sub-contractors and suppliers? Y/N",
        type: 1,
        label: "YES",
        model: "reportLS_52",
      },
      {
        title: "53. Do you have a Supplier Diversity program? Y/N",
        type: 0,
        label: "If yes, provide program details",
        model: "reportLS_53",
      },

      {
        title:
          "54. Do you have a community engagement/investment program with at least one of the following elements: financial support; in-kind donations; pro bono, skills-based or general volunteering? Y/N",
        type: 0,
        label:
          "If yes, please attach a brief description or most recent report.",
        model: "reportLS_54",
      },
    ],
  },
];
export default template;

const defaultData = (type) => {
  switch (type) {
    case 2:
    case 0:
      return "";
    case 1:
      return false;
  }
  return "";
};

const getData = (items) => {
  let ret = {};
  for (const item of items) {
    if (item.model) {
      ret = {
        ...ret,
        [item.model]: defaultData(item.type),
      };
    } else {
      ret = {
        ...ret,
        ...getData(item.items),
      };
    }
  }
  return ret;
};

export const modelData = getData(template);
