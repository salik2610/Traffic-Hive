export const SampleJSONData = [
  {
    id: 1,
    name: 'Traffic Offenses and Penalties',
    data: [{
      "traffic_violations": [
        {
          "sl_no": 1,
          "offence": "Driving without valid license",
          "sec_of_act": "Section 3/181 MVA",
          "punishment": "Rs. 5,000",
          "repeat_offence": "Rs. 10,000",
          "vehicle_type": "All vehicles",
          "license_suspension": "Possible"
        },
        {
          "sl_no": 2,
          "offence": "Drunk driving / Driving under influence of drugs",
          "sec_of_act": "Section 185 MVA",
          "punishment": "Rs. 10,000",
          "repeat_offence": "Rs. 15,000",
          "vehicle_type": "All vehicles",
          "license_suspension": "6 months suspension"
        },
        {
          "sl_no": 3,
          "offence": "Overspeeding",
          "sec_of_act": "Section 183 MVA",
          "punishment": "LMV: Rs. 1,000-2,000, MMV/HMV: Rs. 2,000-4,000",
          "repeat_offence": "LMV: Rs. 2,000-4,000, MMV/HMV: Rs. 4,000-8,000",
          "vehicle_type": "All vehicles",
          "license_suspension": "3 months possible"
        },
        {
          "sl_no": 4,
          "offence": "Dangerous driving",
          "sec_of_act": "Section 184 MVA",
          "punishment": "First offense: Rs. 1,000-5,000 and/or 6 months-1 year imprisonment",
          "repeat_offence": "Up to Rs. 10,000 and/or up to 2 years imprisonment",
          "vehicle_type": "All vehicles",
          "license_suspension": "3 months minimum"
        },
        {
          "sl_no": 5,
          "offence": "Racing and speed testing",
          "sec_of_act": "Section 189 MVA",
          "punishment": "Rs. 5,000 and/or imprisonment up to 1 month",
          "repeat_offence": "Rs. 10,000 and/or imprisonment up to 1 year",
          "vehicle_type": "All vehicles",
          "license_suspension": "Yes"
        },
        {
          "sl_no": 6,
          "offence": "Using mobile phone while driving",
          "sec_of_act": "Section 184 MVA",
          "punishment": "Rs. 1,000-5,000",
          "repeat_offence": "Rs. 10,000",
          "vehicle_type": "All vehicles",
          "license_suspension": "Possible for repeat offense"
        },
        {
          "sl_no": 7,
          "offence": "Driving without insurance",
          "sec_of_act": "Section 196 MVA",
          "punishment": "Rs. 2,000 and/or imprisonment up to 3 months",
          "repeat_offence": "Rs. 4,000",
          "vehicle_type": "All vehicles",
          "license_suspension": "No"
        },
        {
          "sl_no": 8,
          "offence": "Red light jumping",
          "sec_of_act": "Section 184 MVA",
          "punishment": "Rs. 1,000-5,000",
          "repeat_offence": "Rs. 10,000",
          "vehicle_type": "All vehicles",
          "license_suspension": "Possible"
        },
        {
          "sl_no": 9,
          "offence": "Riding without helmet",
          "sec_of_act": "Section 129/177 MVA",
          "punishment": "Rs. 1,000 and disqualification for 3 months",
          "repeat_offence": "Rs. 2,000",
          "vehicle_type": "Two wheelers",
          "license_suspension": "3 months"
        },
        {
          "sl_no": 10,
          "offence": "Driving without seatbelt",
          "sec_of_act": "Section 138(3) MVA",
          "punishment": "Rs. 1,000",
          "repeat_offence": "Rs. 2,000",
          "vehicle_type": "Four wheelers",
          "license_suspension": "No"
        }
      ]
    }]
  },
  {
    id: 2,
    name: 'General Traffic Rules',
    data: {
      "traffic_regulations": {
        "mandatory_rules": [
          {
            "rule": "Carry all valid documents",
            "description": "Driver's license, RC, Insurance, PUC certificate, fitness certificate (commercial vehicles)",
            "applicable_to": "All vehicles"
          },
          {
            "rule": "Follow traffic signals",
            "description": "Stop at red light, prepare to stop at yellow, proceed at green",
            "applicable_to": "All vehicles"
          },
          {
            "rule": "Speed limits",
            "description": "Cities: 40-50 kmph, Highways: 70-100 kmph (varies by vehicle type)",
            "applicable_to": "All vehicles"
          },
          {
            "rule": "Helmets for two-wheelers",
            "description": "ISI-marked helmets mandatory for rider and pillion",
            "applicable_to": "Two wheelers"
          },
          {
            "rule": "Seatbelts",
            "description": "Mandatory for front and rear seats",
            "applicable_to": "Four wheelers"
          }
        ],
        "prohibited_actions": [
          {
            "action": "Using mobile phones while driving",
            "description": "Complete ban on handheld devices while driving",
            "applicable_to": "All vehicles"
          },
          {
            "action": "Drunk driving",
            "description": "Blood alcohol limit: 30mg/100ml of blood",
            "applicable_to": "All vehicles"
          },
          {
            "action": "Overloading",
            "description": "No excess passengers or cargo beyond vehicle capacity",
            "applicable_to": "All vehicles"
          },
          {
            "action": "Modified silencers",
            "description": "No alterations to increase noise levels",
            "applicable_to": "All vehicles"
          }
        ]
      }
    }
  },
  {
    id: 3,
    name: 'License Information',
    data: [{
      "driving_license": {
        "types": [
          {
            "name": "Learner's License",
            "validity": "6 months",
            "age_requirement": "18 years (LMV), 20 years (Transport)",
            "documents_required": [
              "Age proof",
              "Address proof",
              "Medical certificate",
              "Passport size photos",
              "Identity proof"
            ]
          },
          {
            "name": "Permanent License",
            "validity": "20 years or until 50 years of age, whichever earlier",
            "requirements": [
              "Valid Learner's License (minimum 30 days old)",
              "Pass driving test",
              "Complete documentation"
            ],
            "renewal": "Required before expiry"
          }
        ],
        "categories": [
          "LMV - Light Motor Vehicle",
          "HMV - Heavy Motor Vehicle",
          "MCWG - Motorcycle with Gear",
          "MCWOG - Motorcycle without Gear",
          "TRANS - Transport Vehicles"
        ]
      }
    }]
  }
];
