/**
 * Fresh Bus Mystery Ride Audit - Core Logic
 */

const CONFIG = {
    // IMPORTANT: Replace this with your Google Apps Script Web App URL after deployment
    GAS_URL: 'https://script.google.com/macros/s/AKfycbx8_B6w1dekk4Ij1gLy5icZVAvTf_lqLGV-gPDCSjZu9h_SwcEQSHR66a2Gj4_2KCU7/exec'
};

const SECTIONS_CONFIG = [
    {
        "id": 1,
        "title": "Passenger Details",
        "description": "Capture basic ticket information to identify the mystery ride service.",
        "timeEst": "1 min",
        "questions": [
            {
                "id": "pnr",
                "type": "text",
                "label": "PNR Number",
                "floatingLabel": "Write 7 digit PNR Number",
                "required": true,
                "prefix": "FRE",
                "placeholder": " ",
                "validationRegex": "^\\d{7}$",
                "validationMsg": "Required exactly 7 digits."
            },
            {
                "id": "service_route",
                "type": "select",
                "label": "Service Route",
                "required": true,
                "options": [
                    "Hyderabad - Vijayawada",
                    "Vijayawada - Hyderabad",
                    "Bangalore - Chennai",
                    "Chennai - Bangalore",
                    "Bangalore - Tirupati",
                    "Tirupati - Bangalore",
                    "Visakhapatnam - Vijayawada",
                    "Vijayawada - Visakhapatnam",
                    "Hyderabad - Guntur",
                    "Guntur - Hyderabad",
                    "Chennai - Tirupati",
                    "Tirupati - Chennai",
                    "Chennai - Pondicherry",
                    "Pondicherry - Chennai",
                    "Hyderabad - Eluru",
                    "Eluru - Hyderabad",
                    "Bangalore to Salem",
                    "Salem to Bangalore",
                    "Bangalore to Erode",
                    "Erode to Bangalore",
                    "Guntur - Visakhapatnam",
                    "Visakhapatnam - Guntur",
                    "Tirupati - Vijayawada",
                    "Vijayawada - Tirupati",
                    "Coimbatore - Bangalore",
                    "Bangalore - Coimbatore",
                    "Coimbatore - Madurai",
                    "Madurai - Coimbatore"
                ]
            },
            {
                "id": "headcount",
                "type": "select",
                "label": "Number of total passengers (Last Boarding Point)",
                "required": true,
                "options": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30",
                    "31",
                    "32",
                    "33",
                    "34",
                    "35",
                    "36",
                    "37",
                    "38",
                    "39",
                    "40",
                    "41",
                    "42",
                    "43",
                    "44",
                    "45",
                    "46",
                    "47",
                    "48",
                    "49",
                    "50",
                    "51",
                    "52",
                    "53",
                    "54",
                    "55",
                    "56",
                    "57",
                    "58",
                    "59",
                    "60",
                    "61",
                    "62",
                    "63",
                    "64",
                    "65",
                    "66",
                    "67",
                    "68",
                    "69",
                    "70",
                    "71",
                    "72",
                    "73",
                    "74",
                    "75",
                    "76",
                    "77",
                    "78",
                    "79",
                    "80",
                    "81",
                    "82",
                    "83",
                    "84",
                    "85",
                    "86",
                    "87",
                    "88",
                    "89",
                    "90",
                    "91",
                    "92",
                    "93",
                    "94",
                    "95",
                    "96",
                    "97",
                    "98",
                    "99",
                    "100"
                ]
            },
            {
                "id": "headcount_midpoint",
                "type": "select",
                "label": "Number of total passengers at midpoint",
                "required": true,
                "options": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30",
                    "31",
                    "32",
                    "33",
                    "34",
                    "35",
                    "36",
                    "37",
                    "38",
                    "39",
                    "40",
                    "41",
                    "42",
                    "43",
                    "44",
                    "45",
                    "46",
                    "47",
                    "48",
                    "49",
                    "50",
                    "51",
                    "52",
                    "53",
                    "54",
                    "55",
                    "56",
                    "57",
                    "58",
                    "59",
                    "60",
                    "61",
                    "62",
                    "63",
                    "64",
                    "65",
                    "66",
                    "67",
                    "68",
                    "69",
                    "70",
                    "71",
                    "72",
                    "73",
                    "74",
                    "75",
                    "76",
                    "77",
                    "78",
                    "79",
                    "80",
                    "81",
                    "82",
                    "83",
                    "84",
                    "85",
                    "86",
                    "87",
                    "88",
                    "89",
                    "90",
                    "91",
                    "92",
                    "93",
                    "94",
                    "95",
                    "96",
                    "97",
                    "98",
                    "99",
                    "100"
                ]
            }
        ]
    },
    {
        "id": 2,
        "title": "Staff Behaviour & Professionalism",
        "description": "Evaluate how our captains and staff represent FreshBus.",
        "timeEst": "4 min",
        "questions": [
            {
                "type": "heading",
                "label": "Pre-Journey (Onboarding Call / Pre-boarding Contact)"
            },
            {
                "id": "s2_q1",
                "type": "rating",
                "label": "During the pre-journey call, did the co-captain greet you politely, clearly introduce themselves with the company name, and communicate in a respectful and easy-to-understand manner?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "Uniform & Grooming Adherence"
            },
            {
                "id": "s2_u1",
                "type": "rating",
                "label": "Captain and Co-Captain wearing Black Trousers and Blue Shirt",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s2_u3",
                "type": "rating",
                "label": "Well-groomed personality (Clean shaven/trimmed, neat hair)",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "Staff Conduct & Discipline"
            },
            {
                "id": "s2_c1",
                "type": "rating",
                "label": "Did you observe Captain or Co-Captain eating tobacco or chewing gum?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s2_q16",
                "type": "rating",
                "label": "Did you observe Captain or Co-Captain were shouting, using vulgar or rude language, or indulge in arguments with passengers",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "Staff Presence & Responsiveness (During Journey)"
            },
            {
                "id": "s2_q11",
                "type": "rating",
                "label": "Maintained polite and respectful behavior at all times",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "Special Passenger Assistance"
            },
            {
                "id": "s2_q15",
                "type": "rating",
                "label": "Elderly, children, and differently-abled passengers assisted properly",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s2_f1",
                "type": "rating",
                "label": "Whether co-captain upfrontly explained some passengers and ensured all passengers to use motion sickness bag if required?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "Mid-Route Stop Management"
            },
            {
                "id": "s2_q17",
                "type": "rating",
                "label": "Stops announced clearly with halt duration",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s2_q18",
                "type": "rating",
                "label": "During re-boarding, how effectively did the staff ensure all passengers were accounted for (headcount check) and assist them during re-boarding?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "Detailed Section Feedback"
            },
            {
                "id": "s2_good",
                "type": "textarea",
                "label": "Share your positive highlights for Staff Behaviour & Professionalism",
                "required": true
            },
            {
                "id": "s2_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Staff Behaviour & Professionalism",
                "required": true
            },
            {
                "id": "s2_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": true
            }
        ]
    },
    {
        "id": 3,
        "title": "Pickup Responsibilities",
        "description": "Evaluate boarding efficiency and punctuality.",
        "timeEst": "3 min",
        "questions": [
            {
                "type": "heading",
                "label": "Pickup Timing"
            },
            {
                "id": "s3_p1",
                "type": "rating",
                "label": "Pickup point reached on time",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "Onboarding Execution"
            },
            {
                "id": "s8_q2",
                "type": "rating",
                "label": "All luggage tagged properly",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s3_p2",
                "type": "rating",
                "label": "Captain or Co-Captain present on time and clearly visible at boarding point",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s3_p3",
                "type": "rating",
                "label": "Passengers identified correctly with proper ticket verification",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s3_p6",
                "type": "rating",
                "label": "Co-Captain handed the luggage handled safely without damage or negligence",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s3_p8",
                "type": "rating",
                "label": "Did the Co-Captain assist passengers with placing their luggage into the above inside side compartment?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s3_p7",
                "type": "rating",
                "label": "Seat issues or conflicts resolved calmly and fairly",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "Detailed Section Feedback"
            },
            {
                "id": "s3_good",
                "type": "textarea",
                "label": "Share your positive highlights for Pickup Responsibilities",
                "required": true
            },
            {
                "id": "s3_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Pickup Responsibilities",
                "required": true
            },
            {
                "id": "s3_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": true
            }
        ]
    },
    {
        "id": 4,
        "title": "Bus Cleanliness & Maintenance",
        "description": "Audit the physical state of the bus.",
        "timeEst": "5 min",
        "questions": [
            {
                "id": "auditor_seat_type",
                "type": "select",
                "label": "Select your booked seat type",
                "required": true,
                "options": [
                    "Seater",
                    "Sleeper"
                ],
                "conditional": {
                    "Seater": [
                        "h_seat_comfort",
                        "s4_c1",
                        "s4_c2",
                        "s4_c3",
                        "s4_c4",
                        "h_surrounding",
                        "s4_sa1",
                        "s4_sa2",
                        "s4_sa3",
                        "s4_sa4",
                        "h_seater_amenities",
                        "s4_b1",
                        "s4_b2"
                    ],
                    "Sleeper": [
                        "h_sleeper_amenities",
                        "s4_b3",
                        "h_sleeper_comfort",
                        "s4_sleeper_clean"
                    ]
                }
            },
            {
                "type": "heading",
                "label": "Pre-Boarding Cleanliness (First Impression)"
            },
            {
                "id": "s4_q1",
                "type": "rating",
                "label": "Bus exterior looked clean and maintained",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_q2",
                "type": "rating",
                "label": "Entry steps clean and safe",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_m1",
                "type": "rating",
                "label": "Floor mat was there and was clean",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "SEAT CLEANLINESS & HYGIENE"
            },
            {
                "id": "s4_q5",
                "type": "rating",
                "label": "Seat surface clean and dust-free",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_q6",
                "type": "rating",
                "label": "No stains or spill marks",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_q6_a",
                "type": "rating",
                "label": "No leftover trash on seat",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "h_seat_comfort",
                "type": "heading",
                "label": "SEAT COMFORT & SPACE",
                "hidden": true
            },
            {
                "id": "s4_c1",
                "type": "rating",
                "label": "Seat cushioning comfortable for journey",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_c2",
                "type": "rating",
                "label": "Backrest support adequate and firm",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_c3",
                "type": "rating",
                "label": "Sufficient leg space available",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_c4",
                "type": "rating",
                "label": "Reclining function smooth and usable",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "h_surrounding",
                "type": "heading",
                "label": "SURROUNDING AREA CLEANLINESS",
                "hidden": true
            },
            {
                "id": "s4_sa1",
                "type": "rating",
                "label": "Floor clean without litter or dust",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_sa2",
                "type": "rating",
                "label": "Aisle clear and obstruction-free",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_sa3",
                "type": "rating",
                "label": "Under-seat area clean and tidy",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_sa4",
                "type": "rating",
                "label": "Armrests and handles clean",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "WINDOWS, Curtains, FIXTURES & DOORS CONDITION"
            },
            {
                "id": "s4_q17",
                "type": "rating",
                "label": "Windows clean and smudge-free",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_w1",
                "type": "rating",
                "label": "Curtains clean and properly maintained",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_w2",
                "type": "rating",
                "label": "Curtain Hooks properly working and not damaged",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "h_seater_amenities",
                "type": "heading",
                "label": "Seater - Amenities Quality",
                "hidden": true
            },
            {
                "id": "s4_b1",
                "type": "rating",
                "label": "Bottle Holders clean and functional?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_b2",
                "type": "rating",
                "label": "Magazine Holders clean and not broken?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "h_sleeper_amenities",
                "type": "heading",
                "label": "Sleeper Seat - Amenities Quality Check",
                "hidden": true
            },
            {
                "id": "s4_b3",
                "type": "rating",
                "label": "Inside Cabin Luggage in Sleeper Compartments clean and not broken?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "AIR QUALITY & VENTILATION"
            },
            {
                "id": "s4_q21",
                "type": "rating",
                "label": "Air conditioning working properly",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_av1",
                "type": "rating",
                "label": "Temperature maintained comfortably",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_v1",
                "type": "rating",
                "label": "Were there loose AC fittings inside the bus?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "ODOUR & FRESHNESS"
            },
            {
                "id": "s4_q25",
                "type": "rating",
                "label": "No bad odour inside bus",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_o1",
                "type": "rating",
                "label": "Was extreme air freshener used inside the bus?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "UTILITY FEATURES FUNCTIONALITY"
            },
            {
                "id": "s4_u1",
                "type": "rating",
                "label": "USB Port working properly or not?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_u2",
                "type": "rating",
                "label": "Type C Port working or not?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_uf1",
                "type": "rating",
                "label": "Reading lights functioning correctly or not?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "NOISE & RIDE COMFORT"
            },
            {
                "id": "s4_nr2",
                "type": "rating",
                "label": "Cabin reasonably quiet during travel",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s4_nr4",
                "type": "rating",
                "label": "Smooth ride without discomfort",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "h_sleeper_comfort",
                "type": "heading",
                "label": "Sleeper - Comfort Amenities Quality",
                "hidden": true
            },
            {
                "id": "s4_sleeper_clean",
                "type": "rating",
                "label": "Were the blankets, bedsheets, and pillows clean and well maintained?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "Detailed Section Feedback"
            },
            {
                "id": "s4_good",
                "type": "textarea",
                "label": "Share your positive highlights for Bus Cleanliness & Maintenance",
                "required": true
            },
            {
                "id": "s4_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Bus Cleanliness & Maintenance",
                "required": true
            },
            {
                "id": "s4_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": true
            }
        ]
    },
    {
        "id": 5,
        "title": "Driving & Technical Safety",
        "description": "Road discipline, Captain & Co-Captain behavior, vehicle health, and safety compliance.",
        "timeEst": "5 min",
        "severity": "CRITICAL",
        "questions": [
            {
                "type": "heading",
                "label": "Mechanical Condition & Vehicle Health"
            },
            {
                "id": "s5_m1",
                "type": "rating",
                "label": "No unusual vibrations felt during travel",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s5_m2",
                "type": "rating",
                "label": "No abnormal engine noise observed",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s5_m3",
                "type": "rating",
                "label": "No smoke or burning smell from vehicle",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s5_m4",
                "type": "rating",
                "label": "Vehicle performance stable throughout journey",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s5_m5",
                "type": "rating",
                "label": "No signs of breakdown or technical faults",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "Safety Equipment Availability (Visibility Check)"
            },
            {
                "id": "s5_sv_fire",
                "type": "rating",
                "label": "Was the fire extinguisher clearly visible inside the bus?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s5_sv_hammer",
                "type": "rating",
                "label": "Was the emergency hammer clearly visible inside the bus?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s5_sv_firstaid",
                "type": "rating",
                "label": "Was the first aid kit available and properly stocked with essential items?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "Captain & Co-Captain Fitness & Sobriety (Critical)"
            },
            {
                "id": "s5_fit1",
                "type": "rating",
                "label": "Captain and Co-Captain showed no signs of intoxication while driving",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s5_fit2",
                "type": "rating",
                "label": "No smell of alcohol from the Captain or Co-Captain",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s5_fit3",
                "type": "rating",
                "label": "Captain and Co-Captain behaved normally and remained well-controlled",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s5_fit4",
                "type": "rating",
                "label": "Captain and Co-Captain spoke clearly while interacting with passengers",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "Detailed Section Feedback"
            },
            {
                "id": "s5_good",
                "type": "textarea",
                "label": "Share your positive highlights for Driving & Technical Safety",
                "required": true
            },
            {
                "id": "s5_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Driving & Technical Safety",
                "required": true
            },
            {
                "id": "s5_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": true
            }
        ]
    },
    {
        "id": 6,
        "title": "Food & Pitstop Audit",
        "description": "Comprehensive audit of food service, pitstop hygiene, and journey restart experience.",
        "timeEst": "10 min",
        "questions": [
            {
                "id": "s6_water",
                "type": "rating",
                "label": "Were water bottles provided by the staff. If Yes, was it sealed and clean",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_food_type",
                "type": "select",
                "label": "What type of food Service were applicable in your journey?",
                "required": true,
                "options": [
                    "Snack Box",
                    "Breakfast/Lunch/Dinner",
                    "Both",
                    "N/A"
                ],
                "conditional": {
                    "Snack Box": [
                        "h_snack_box",
                        "s6_sb1",
                        "s6_sb2",
                        "s6_sb3",
                        "s6_sb4"
                    ],
                    "Breakfast/Lunch/Dinner": [
                        "h_pitstop_food",
                        "s6_pf1",
                        "s6_pf2",
                        "s6_pf3",
                        "s6_pf4",
                        "s6_pf5",
                        "s6_pf6",
                        "s6_pf7",
                        "s6_pf8",
                        "s6_pf9",
                        "s6_pf10",
                        "s6_pf11",
                        "s6_pf12",
                        "s6_pf13"
                    ],
                    "Both": [
                        "h_snack_box",
                        "s6_sb1",
                        "s6_sb2",
                        "s6_sb3",
                        "s6_sb4",
                        "h_pitstop_food",
                        "s6_pf1",
                        "s6_pf2",
                        "s6_pf3",
                        "s6_pf4",
                        "s6_pf5",
                        "s6_pf6",
                        "s6_pf7",
                        "s6_pf8",
                        "s6_pf9",
                        "s6_pf10",
                        "s6_pf11",
                        "s6_pf12",
                        "s6_pf13"
                    ]
                }
            },
            {
                "id": "h_snack_box",
                "type": "heading",
                "label": "SNACK BOX QUESTIONS",
                "hidden": true
            },
            {
                "id": "s6_sb1",
                "type": "rating",
                "label": "Was snack box distributed to you by the co-captain?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_sb2",
                "type": "rating",
                "label": "If provided, was the snack box properly sealed, fresh, and in good condition?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_sb3",
                "type": "rating",
                "label": "Was snack box items close to expiry or expired? If yes, describe the issue in detail and upload the image of the item.",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_sb4",
                "type": "rating",
                "label": "Were all items present inside the snack box? (Items Include - Juice Packet, Wet Wipes, Namkeen Packet, Peanut Chikki). If not, describe in detail what items are missing.",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "h_pitstop_food",
                "type": "heading",
                "label": "PITSTOP FOOD SERVICE - BREAKFAST/LUNCH/DINNER",
                "hidden": true
            },
            {
                "id": "s6_pf1",
                "type": "rating",
                "label": "Was the pitstop location communicated clearly in advance?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_pf2",
                "type": "rating",
                "label": "Was the stop duration sufficient to comfortably finish the meal?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_pf3",
                "type": "rating",
                "label": "Was the food served promptly upon arrival or was there a waiting time?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_pf4",
                "type": "rating",
                "label": "Was the food served at appropriate temperature?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_pf5",
                "type": "rating",
                "label": "Were the portion sizes of the meal Adequate?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_pf6",
                "type": "rating",
                "label": "Did the taste and quality of the food served meet expectations?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_pf7",
                "type": "rating",
                "label": "Was drinking water easily available and safe?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_pf8",
                "type": "rating",
                "label": "Were serving utensils, plates, and glasses clean and hygienic?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_pf9",
                "type": "rating",
                "label": "Were add-ons (extra servings, beverages) available if needed?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_pf10",
                "type": "rating",
                "label": "Was AC Working on the Pitstop Freshbus Dining Area?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_pf11",
                "type": "rating",
                "label": "Did the co-captain inform passengers about the QR code for the free meal (Breakfast/Lunch/Dinner) to be received on their WhatsApp — the number provided during booking?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_pf12",
                "type": "rating",
                "label": "If a customer did not receive the QR code, did the co-captain and Freshbus Dining Area staff assist by asking for their PNR number and providing the free meal?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_pf13",
                "type": "rating",
                "label": "Was the customer's meal QR code scanned by staff at the Freshbus Dining Area at the pitstop?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "🧼 PITSTOP OVERALL EXPERIENCE & HYGIENE"
            },
            {
                "id": "s6_po1",
                "type": "rating",
                "label": "Was the pitstop facility clean and well-maintained overall?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_po2",
                "type": "rating",
                "label": "Were restrooms hygienic, functional, and adequately stocked?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_po3",
                "type": "rating",
                "label": "Was handwashing/sanitization available and accessible?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_po4",
                "type": "rating",
                "label": "Did the location feel safe and well-lit?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_po5",
                "type": "rating",
                "label": "Was there adequate seating and space for passengers?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_po6",
                "type": "rating",
                "label": "Was crowd management handled properly at the location?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_po7",
                "type": "rating",
                "label": "Were waste disposal bins available and used effectively?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_po8",
                "type": "rating",
                "label": "Was the environment (noise, smell, cleanliness) comfortable?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_po9",
                "type": "rating",
                "label": "Was the stop duration well-balanced (not rushed or too long)?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_po10",
                "type": "rating",
                "label": "Did the pitstop enhance or disrupt your overall journey experience?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_po11",
                "type": "rating",
                "label": "Were there clear signages for facilities (restrooms, food counters, etc.)?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_po12",
                "type": "rating",
                "label": "Was staff behavior at the pitstop courteous and helpful?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "🚌 JOURNEY RESTART EXPERIENCE (POST PITSTOP)"
            },
            {
                "id": "s6_jr1",
                "type": "rating",
                "label": "Was a clear announcement made before restarting the journey?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_jr2",
                "type": "rating",
                "label": "Were passengers given sufficient notice/time to return to the bus?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_jr3",
                "type": "rating",
                "label": "Did the captain/co-captain actively check if all passengers had boarded before departure?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_jr4",
                "type": "rating",
                "label": "Was the passenger count re-verified before restarting the journey?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_jr5",
                "type": "rating",
                "label": "Was there any confusion or rush during the re-boarding process?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_jr6",
                "type": "rating",
                "label": "Were any passengers left behind or reboarding issues observed?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "🔋 EV CHARGING EXPERIENCE"
            },
            {
                "id": "s6_ev1",
                "type": "rating",
                "label": "Did the charging process cause any delays beyond the expected time, and were timely updates provided?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_ev2",
                "type": "rating",
                "label": "Did the charging stop disrupt your journey schedule significantly?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s6_ev3",
                "type": "rating",
                "label": "During the charging delay, what was the AC condition inside the bus and how did it impact passenger comfort?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "Detailed Section Feedback"
            },
            {
                "id": "s6_good",
                "type": "textarea",
                "label": "✨ Share your positive highlights for Food, Pitstop, & Charging",
                "required": true
            },
            {
                "id": "s6_wrong",
                "type": "textarea",
                "label": "⚠️ Mention any gaps or areas for improvement in Food, Pitstop, & Charging",
                "required": true
            },
            {
                "id": "s6_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": true
            }
        ]
    },
    {
        "id": 7,
        "title": "Announcements",
        "description": "Audit the quality and content of staff announcements.",
        "timeEst": "3 min",
        "questions": [
            {
                "type": "heading",
                "label": "Announcement Content"
            },
            {
                "id": "s7_q1",
                "type": "rating",
                "label": "Welcome announcement made clearly after boarding",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s7_q3",
                "type": "rating",
                "label": "Important route updates or delay announcements shared when needed",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s7_q5",
                "type": "rating",
                "label": "Drop-off point announcements made before reaching stops",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "Quality & Delivery"
            },
            {
                "id": "s7_q6",
                "type": "rating",
                "label": "Were announcements made clearly enough to be heard and understood?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s7_q8",
                "type": "rating",
                "label": "Was the tone of the staff polite and professional?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s7_q9",
                "type": "rating",
                "label": "Were announcements informative and relevant?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s7_q10",
                "type": "rating",
                "label": "Were passengers politely asked for ratings or feedback at appropriate time?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "Detailed Section Feedback"
            },
            {
                "id": "s7_good",
                "type": "textarea",
                "label": "Share your positive highlights for Announcements",
                "required": true
            },
            {
                "id": "s7_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Announcements",
                "required": true
            },
            {
                "id": "s7_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": true
            }
        ]
    },
    {
        "id": 8,
        "title": "Pilferage Check",
        "description": "Ensure financial integrity and ticket verification.",
        "timeEst": "5 min",
        "severity": "CRITICAL",
        "questions": [
            {
                "type": "heading",
                "label": "Ticket & Luggage Integrity"
            },
            {
                "id": "s8_q1",
                "type": "radio",
                "label": "Were any unauthorized passengers observed?",
                "required": true,
                "options": [
                    "Yes",
                    "No"
                ],
                "conditional": {
                    "Yes": [
                        "h_cash_handling",
                        "s8_q3",
                        "s8_q4",
                        "s8_q5",
                        "s8_q6",
                        "s8_q7",
                        "s8_q8",
                        "s8_q9",
                        "s8_q10",
                        "s8_amount",
                        "s8_staff",
                        "s8_media"
                    ]
                }
            },
            {
                "id": "h_cash_handling",
                "type": "heading",
                "label": "Unauthorized Cash Handling",
                "hidden": true
            },
            {
                "id": "s8_q3",
                "type": "radio",
                "label": "Did any staff ask for cash payment without providing an official receipt?",
                "required": true,
                "hidden": true,
                "options": [
                    "Yes",
                    "No"
                ]
            },
            {
                "id": "s8_q4",
                "type": "radio",
                "label": "Did staff request extra money for seat allocation or luggage?",
                "required": true,
                "hidden": true,
                "options": [
                    "Yes",
                    "No"
                ]
            },
            {
                "id": "s8_q5",
                "type": "radio",
                "label": "Did staff ask passengers to pay outside the official booking system?",
                "required": true,
                "hidden": true,
                "options": [
                    "Yes",
                    "No"
                ]
            },
            {
                "id": "s8_q6",
                "type": "radio",
                "label": "Did staff collect cash for a service normally included in the fare?",
                "required": true,
                "hidden": true,
                "options": [
                    "Yes",
                    "No"
                ]
            },
            {
                "id": "s8_q7",
                "type": "radio",
                "label": "Was any cash collected without clearly explaining the reason?",
                "required": true,
                "hidden": true,
                "options": [
                    "Yes",
                    "No"
                ]
            },
            {
                "id": "s8_q8",
                "type": "radio",
                "label": "Did you observe staff accepting cash from passengers discreetly?",
                "required": true,
                "hidden": true,
                "options": [
                    "Yes",
                    "No"
                ]
            },
            {
                "id": "s8_q9",
                "type": "radio",
                "label": "Did any passenger appear to board after paying cash directly?",
                "required": true,
                "hidden": true,
                "options": [
                    "Yes",
                    "No"
                ]
            },
            {
                "id": "s8_q10",
                "type": "radio",
                "label": "Was there any sign of unethical cash handling by staff?",
                "required": true,
                "hidden": true,
                "options": [
                    "Yes",
                    "No"
                ]
            },
            {
                "id": "s8_amount",
                "type": "text",
                "label": "Amount (Approx. in \u20b9)",
                "required": true,
                "hidden": true,
                "placeholder": "Enter the amount",
                "validationRegex": "^\\d{1,5}$",
                "validationMsg": "Only numbers up to 5 digits are allowed, no decimals or special characters."
            },
            {
                "id": "s8_staff",
                "type": "select",
                "label": "Staff Involved",
                "required": true,
                "hidden": true,
                "options": [
                    "Co-Captain",
                    "Captain",
                    "Sales Person"
                ]
            },
            {
                "id": "s8_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": true,
                "hidden": true
            },
            {
                "type": "heading",
                "label": "Detailed Section Feedback"
            },
            {
                "id": "s8_good",
                "type": "textarea",
                "label": "Share your positive highlights for Pilferage Check",
                "required": false,
                "conditionalRequired": {
                    "questionId": "s8_q1",
                    "value": "Yes"
                }
            },
            {
                "id": "s8_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Pilferage Check",
                "required": false,
                "conditionalRequired": {
                    "questionId": "s8_q1",
                    "value": "Yes"
                }
            }
        ]
    },
    {
        "id": 9,
        "title": "Delay Adherence",
        "description": "Analyze journey punctuality.",
        "timeEst": "3 min",
        "questions": [
            {
                "type": "heading",
                "label": "Punctuality Check"
            },
            {
                "id": "s9_q1",
                "type": "rating",
                "label": "Journey started on time from departure point",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s9_q2",
                "type": "rating",
                "label": "Overall delay (if any) was justified and managed",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s9_q4",
                "type": "radio",
                "label": "Was the total journey delay more than 15 minutes?",
                "required": true,
                "options": [
                    "Yes",
                    "No"
                ],
                "conditional": {
                    "Yes": [
                        "s9_q5",
                        "s9_q6",
                        "s9_q6b",
                        "s9_q7",
                        "s9_q8",
                        "s9_q9",
                        "s9_q10",
                        "s9_total_delay",
                        "s9_media"
                    ]
                }
            },
            {
                "id": "s9_q5",
                "type": "rating",
                "label": "Was the reason for the delay clearly communicated to passengers?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s9_q6",
                "type": "rating",
                "label": "Were updates shared regularly during the delay?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s9_q6b",
                "type": "rating",
                "label": "Were passengers reassured calmly with an apology and clear communication?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s9_q7",
                "type": "rating",
                "label": "Was the delay caused by operational issues within staff control?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s9_q8",
                "type": "rating",
                "label": "Did unnecessary halts or stoppages contribute to the delay?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s9_q9",
                "type": "rating",
                "label": "Despite the delay, did the staff manage the situation professionally?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s9_q10",
                "type": "rating",
                "label": "Was the overall trip schedule managed efficiently?",
                "required": true,
                "hidden": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s9_total_delay",
                "type": "select",
                "label": "Total delay observed (minutes)",
                "required": true,
                "hidden": true,
                "options": [
                    "10",
                    "20",
                    "30",
                    "40",
                    "50",
                    "60",
                    "70",
                    "80",
                    "90",
                    "100",
                    "110",
                    "120",
                    "130",
                    "140",
                    "150",
                    "160",
                    "170",
                    "180",
                    "190",
                    "200",
                    "210",
                    "220",
                    "230",
                    "240",
                    "250",
                    "260",
                    "270",
                    "280",
                    "290",
                    "300"
                ]
            },
            {
                "id": "s9_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": true,
                "hidden": true
            },
            {
                "type": "heading",
                "label": "Detailed Section Feedback"
            },
            {
                "id": "s9_good",
                "type": "textarea",
                "label": "Share your positive highlights for Delay Adherence",
                "required": false,
                "conditionalRequired": {
                    "questionId": "s9_q4",
                    "value": "Yes"
                }
            },
            {
                "id": "s9_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Delay Adherence",
                "required": false,
                "conditionalRequired": {
                    "questionId": "s9_q4",
                    "value": "Yes"
                }
            }
        ]
    },
    {
        "id": 10,
        "title": "Safety & Security",
        "description": "Emergency preparedness and passenger safety.",
        "timeEst": "4 min",
        "severity": "CRITICAL",
        "questions": [
            {
                "type": "heading",
                "label": "Emergency Preparedness"
            },
            {
                "id": "s10_q3",
                "type": "checkbox",
                "label": "Were emergency exits/CCTV systems present and reassuring?",
                "required": true,
                "options": [
                    "CCTV visible",
                    "Emergency exits marked",
                    "Staff alert and monitoring",
                    "Night halt at safe locations",
                    "None noticed"
                ]
            },
            {
                "type": "heading",
                "label": "Passenger Safety"
            },
            {
                "id": "s10_q4",
                "type": "rating",
                "label": "Did you feel safe and secure throughout the journey?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s10_q5",
                "type": "rating",
                "label": "Were all passengers onboarded with proper ID verification?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s10_q7",
                "type": "rating",
                "label": "No harassment or uncomfortable conduct toward any passenger",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s10_q8",
                "type": "rating",
                "label": "No aggressive behavior or fights between passengers",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s10_q9",
                "type": "checkbox",
                "label": "Any safety/security issues observed? (Select all)",
                "required": true,
                "options": [
                    "Harassment / inappropriate behaviour",
                    "Argument/fight between passengers",
                    "Unsafe passenger behaviour",
                    "Theft suspicion / missing belongings",
                    "Staff using mobile while driving",
                    "Staff using earphones while driving",
                    "Staff appearing drunk/intoxicated",
                    "Staff appearing sleepy/fatigued",
                    "Passenger onboarded in drunken state",
                    "Unauthorized / suspicious passenger",
                    "Bus stopped at undisclosed location",
                    "Passenger smoking/alcohol",
                    "Blocking aisle / emergency exit",
                    "Verbal abuse or threatening",
                    "No issues observed"
                ]
            },
            {
                "id": "s10_q11",
                "type": "rating",
                "label": "If issues occurred, did staff respond quickly and appropriately?",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "Detailed Section Feedback"
            },
            {
                "id": "s10_good",
                "type": "textarea",
                "label": "Share your positive highlights for Safety & Security",
                "required": true
            },
            {
                "id": "s10_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Safety & Security",
                "required": true
            },
            {
                "id": "s10_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": true
            }
        ]
    },
    {
        "id": 11,
        "title": "Drop Responsibilities",
        "description": "Evaluate deboarding efficiency and closing interaction.",
        "timeEst": "3 min",
        "questions": [
            {
                "type": "heading",
                "label": "Drop Timing"
            },
            {
                "id": "s11_d1",
                "type": "rating",
                "label": "Drop point reached as per schedule",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "Drop-off Execution"
            },
            {
                "id": "s11_d3",
                "type": "rating",
                "label": "Exit managed safely without rush or confusion",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "id": "s11_d4",
                "type": "rating",
                "label": "Luggage returned correctly without delays or mix-ups",
                "required": true,
                "descriptionTrigger": [
                    1,
                    2,
                    5
                ],
                "descriptionLabel": "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"
            },
            {
                "type": "heading",
                "label": "Detailed Section Feedback"
            },
            {
                "id": "s11_good",
                "type": "textarea",
                "label": "Share your positive highlights for Drop Responsibilities",
                "required": true
            },
            {
                "id": "s11_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Drop Responsibilities",
                "required": true
            },
            {
                "id": "s11_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": true
            }
        ]
    },
    {
        "id": 12,
        "title": "Passenger Feedbacks",
        "description": "Capture direct feedback from other travelers.",
        "timeEst": "5 min",
        "questions": [
            {
                "id": "feedback_recorded",
                "type": "radio",
                "label": "Did you record detailed feedback from other passengers?",
                "required": true,
                "options": [
                    "Yes",
                    "No"
                ]
            }
        ]
    },
    {
        "id": 13,
        "title": "Final Observations",
        "description": "Overall journey summary and final remarks.",
        "timeEst": "3 min",
        "questions": [
            {
                "type": "heading",
                "label": "Conclusion"
            },
            {
                "id": "s13_positive_final",
                "type": "textarea",
                "label": "Any other final positive observation from the complete audit journey? *",
                "required": true
            },
            {
                "id": "s13_negative_final",
                "type": "textarea",
                "label": "Any other final negative observation from the complete audit journey? *",
                "required": true
            },
            {
                "id": "s13_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": true
            }
        ]
    }
];

class FreshBusAudit {
    constructor() {
        this.currentStep = -1; // Start with intro
        this.theme = localStorage.getItem('freshbus_theme') || 'light';
        this.formData = JSON.parse(localStorage.getItem('freshbus_draft')) || {};
        this.filesData = {}; // Persistent storage for file blobs
        this.passengers = this.formData.passengers || [{ id: Date.now(), name: "", seatType: "", seatNo: "", feedback: "" }];

        this.elements = {
            renderArea: document.getElementById('section-render'),
            btnBack: document.getElementById('btn-back'),
            btnNext: document.getElementById('btn-next'),
            btnSubmit: document.getElementById('btn-submit'),
            progressBar: (id) => document.getElementById(id),
            sidebarToggle: document.getElementById('sidebar-toggle'),
            mobileMenuBtn: document.getElementById('mobile-menu-btn'),
            sidebar: document.getElementById('sidebar'),
            themeBtn: document.getElementById('theme-toggle')
        };

        this.init();
    }

    init() {
        this.applyTheme();
        this.render();
        this.setupEventListeners();
        this.updateProgress();
    }

    setupEventListeners() {
        const form = document.getElementById('audit-form');
        if (form) {
            form.addEventListener('submit', e => e.preventDefault());
        }
        this.elements.btnNext.addEventListener('click', () => this.nextStep());
        this.elements.btnBack.addEventListener('click', () => this.prevStep());
        this.elements.btnSubmit.addEventListener('click', () => this.showPreview());

        if (this.elements.sidebarToggle) {
            this.elements.sidebarToggle.addEventListener('click', () => {
                const app = document.getElementById('app');
                const isCollapsed = app.classList.toggle('sidebar-collapsed');
                const icon = document.getElementById('sidebar-icon');
                if (icon) {
                    if (window.innerWidth <= 768) {
                        // On mobile, this toggle should behave like close
                        document.getElementById('app').classList.remove('sidebar-open');
                    } else {
                        icon.className = isCollapsed ? 'fa-solid fa-bars-staggered' : 'fa-solid fa-xmark';
                    }
                }
            });
        }

        if (this.elements.mobileMenuBtn) {
            this.elements.mobileMenuBtn.addEventListener('click', () => {
                document.getElementById('app').classList.toggle('sidebar-open');
            });
        }

        const overlay = document.getElementById('sidebar-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                document.getElementById('app').classList.remove('sidebar-open');
            });
        }

        this.elements.themeBtn.addEventListener('click', () => this.toggleTheme());
        document.getElementById('confirm-submit').addEventListener('click', () => this.finalizeSubmission());

        const btnAutofill = document.getElementById('btn-autofill');
        if (btnAutofill) {
            btnAutofill.addEventListener('click', () => this.fillAllAndGo());
        }
        // Modal close
        document.querySelector('.close-modal').onclick = () => {
            document.getElementById('preview-modal').style.display = 'none';
        };

        // Delegate interactions
        this.elements.renderArea.addEventListener('change', (e) => this.handleInput(e));
        this.elements.renderArea.addEventListener('input', (e) => {
            if (e.target.tagName === 'TEXTAREA' || e.target.type === 'text' || e.target.type === 'number') {
                this.handleInput(e);
            }
        });
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('freshbus_theme', this.theme);
        this.applyTheme();
    }

    applyTheme() {
        document.body.setAttribute('data-theme', this.theme);
        const icon = this.elements.themeBtn.querySelector('i');
        icon.className = this.theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }

    handleInput(e) {
        const target = e.target;
        const name = target.name;
        if (!name) return;

        let value;
        if (target.type === 'file') {
            const files = Array.from(target.files);
            if (files.length > 0) {
                const filesToProcess = files.slice(0, 10);
                if (!this.filesData[name]) this.filesData[name] = [];

                const existingCount = this.filesData[name].length;
                const newFiles = filesToProcess.slice(0, 10 - existingCount);

                if (newFiles.length === 0 && files.length > 0) {
                    this.showToast("Maximum 10 files allowed per section.", "error");
                    return;
                }

                this.showToast("Processing files... ⏳");
                Promise.all(newFiles.map(f => this.fileToBase64(f))).then(base64s => {
                    newFiles.forEach((file, i) => {
                        this.filesData[name].push({
                            name: file.name,
                            type: file.type,
                            base64: base64s[i]
                        });
                    });
                    this.showToast(`${newFiles.length} File(s) Captured ✅`);
                    this.render();
                }).catch(err => {
                    console.error("File processing error:", err);
                    this.showToast("Error processing files.", "error");
                });
            }
        } else if (target.type === 'checkbox') {
            value = this.getCheckboxValues(name);
        } else if (target.type === 'radio') {
            value = target.value;
            // Visual feedback for stars
            if (target.id.startsWith('star_')) {
                this.updateStarUI(name, value);
            }
            this.formData[name] = value;
            if (name === 'feedback_recorded') {
                this.saveDraft();
                this.render();
                return;
            }
        } else {
            value = target.value;
        }

        // Special handling for Passenger list
        if (name.startsWith('p_')) {
            const [_, field, id] = name.split('_');
            const pIdx = this.passengers.findIndex(p => p.id == id);
            if (pIdx > -1) this.passengers[pIdx][field] = value;
        }

        this.formData[name] = value;

        this.saveDraft();
        this.checkConditionals(name, value);
    }

    updateStarUI(name, value) {
        const container = document.getElementById(`rating_${name}`);
        if (!container) return;
        const labels = container.querySelectorAll('.star-label');
        const ratingValue = parseInt(value);
        labels.forEach(label => {
            const starVal = parseInt(label.getAttribute('data-value'));
            if (starVal <= ratingValue) {
                label.classList.add('active');
                label.classList.toggle('rating-low', ratingValue <= 3);
                label.classList.toggle('rating-high', ratingValue > 3);
            } else {
                label.classList.remove('active', 'rating-low', 'rating-high');
            }
        });
    }

    getCheckboxValues(name) {
        return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(el => el.value);
    }

    checkConditionals(name, value) {
        // Star rating descriptions
        const qConfig = SECTIONS_CONFIG[this.currentStep].questions.find(q => q.id === name);
        if (qConfig && qConfig.descriptionTrigger) {
            const descEl = document.getElementById(`desc_box_${name}`);
            if (descEl) {
                const show = !!value;
                descEl.style.display = show ? 'block' : 'none';
                if (!show) this.formData[`${name}_desc`] = "N/A";
            }
        }

        // Logic-based display
        if (qConfig && qConfig.conditional) {
            const rules = qConfig.conditional[value] || [];
            // Hide all potential relatives first
            Object.values(qConfig.conditional).flat().forEach(id => {
                const el = document.getElementById(`q_wrapper_${id}`);
                if (el) el.style.display = 'none';
            });
            // Show only relevant ones
            rules.forEach(id => {
                const el = document.getElementById(`q_wrapper_${id}`);
                if (el) el.style.display = 'block';
            });
        }
    }

    saveDraft() {
        this.formData.passengers = this.passengers;
        localStorage.setItem('freshbus_draft', JSON.stringify(this.formData));
        this.showToast();
    }

    showToast() {
        const toast = document.getElementById('autosave-toast');
        toast.style.display = 'block';
        setTimeout(() => toast.style.display = 'none', 2000);
    }

    render() {
        try {
            if (this.currentStep >= 0) {
                this.renderHorizontalNav();
            }

            if (this.currentStep === -1) {
                this.renderIntro();
                return;
            }

            const section = SECTIONS_CONFIG[this.currentStep];

            // Ensure App Shell is visible (in case returning from intro)
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('sidebar-toggle');
            const headerProgress = document.getElementById('header-progress');
            const headerTitle = document.querySelector('.header-title-compact');
            const appFooter = document.getElementById('app-footer');
            const formContainer = document.getElementById('main-content');

            if (headerTitle) {
                headerTitle.innerText = "Flying Audit Form";
            }
            if (formContainer) {
                formContainer.classList.remove('intro-mode');
                formContainer.style.height = 'auto';
            }

            const horizontalNav = document.getElementById('horizontal-nav');
            if (horizontalNav) horizontalNav.style.display = '';
            if (headerProgress) headerProgress.style.display = '';
            if (appFooter) appFooter.style.display = '';

            let html = `
                <div class="section-card">
                    <div class="section-title">
                        <span class="step-num">${section.id}.</span> 
                        ${section.title}
                        ${section.severity ? `<span class="severity-tag severity-${section.severity.toLowerCase()}">${section.severity}</span>` : ''}
                        <span class="time-est"><i class="fa-regular fa-clock"></i> ${section.timeEst}</span>
                    </div>
                    ${section.description ? `<p class="section-desc" style="margin-bottom: 2rem; color: var(--text-muted); font-size: 0.95rem; line-height: 1.5; border-left: 3px solid var(--accent); padding-left: 1rem;">${section.description}</p>` : ''}
                    <div class="section-content">
            `;

            if (section.id === 12) {
                html += this.renderPassengerSection();
            } else {
                section.questions.forEach(q => {
                    html += this.renderQuestion(q);
                });
            }

            html += `</div></div>`; // end section-content and section-card
            this.elements.renderArea.innerHTML = html;

            // Visibility sync
            this.syncVisibility();

            // Navigation button sync
            this.elements.btnBack.style.display = (this.currentStep === 0) ? 'none' : 'flex';
            if (this.currentStep === SECTIONS_CONFIG.length - 1) {
                this.elements.btnNext.style.display = 'none';
                this.elements.btnSubmit.style.display = 'flex';
            } else {
                this.elements.btnNext.style.display = 'flex';
                this.elements.btnSubmit.style.display = 'none';
            }

            window.scrollTo(0, 0);
        } catch (e) {
            alert("Error in render: " + e.message + "\n" + e.stack);
        }
    }

    renderHorizontalNav() {
        const menu = document.getElementById('section-menu');
        if (!menu) return;

        let html = '';
        SECTIONS_CONFIG.forEach((sec, idx) => {
            const isActive = this.currentStep === idx ? 'active' : '';
            const isCompleted = this.isSectionValid(idx) ? 'completed' : '';
            const icon = isCompleted ? '<i class="fa-solid fa-check-circle"></i> ' : `<span style="display:inline-block; margin-right:4px;">${idx + 1}.</span> `;
            html += `<li class="${isActive} ${isCompleted}" onclick="window.app.goToStep(${idx})">${icon} ${sec.title}</li>`;
        });
        menu.innerHTML = html;

        // Auto-scroll the active tab into view smoothly
        setTimeout(() => {
            const activeTab = menu.querySelector('.active');
            if (activeTab) {
                activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }, 50);
    }

    goToStep(idx) {
        // NON-LINEAR NAVIGATION: Allow jumping to any section without strict validation block.
        // We only save draft data when they navigate away.
        this.saveDraft();
        this.currentStep = idx;
        this.render();
        this.updateProgress();
    }

    renderIntro() {
        // Hide App Shell Elements
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const headerProgress = document.getElementById('header-progress');
        const headerTitle = document.querySelector('.header-title-compact');
        const appFooter = document.getElementById('app-footer');
        const formContainer = document.getElementById('main-content');

        const horizontalNav = document.getElementById('horizontal-nav');
        if (horizontalNav) horizontalNav.style.display = 'none';
        if (headerProgress) headerProgress.style.display = 'none';
        if (appFooter) appFooter.style.display = 'none';

        if (formContainer) {
            formContainer.classList.add('intro-mode');
        }

        const html = `
            <div class="section-card intro-card-content">
                <div class="intro-logo-container">
                    <img src="logo.webp" alt="FreshBus" class="intro-logo"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="intro-logo-fallback">
                        🚌 FreshBus
                    </div>
                </div>
                <h1 class="intro-welcome">Welcome, Auditor! 👋</h1>
                <p class="intro-text" style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 1.5rem; text-align: left;">
                    You're an important part of the <strong>FreshBus Flying Audit Program</strong>.<br><br>
                    Every photo you capture, every rating you give, and every observation you share helps us create a better travel experience for millions of passengers.
                </p>
                
                <div class="reward-highlight">
                    <i class="fa-solid fa-gift"></i>
                    <span>Be honest. Be accurate. Your valuable feedback makes a real difference - and qualifies you for exciting rewards!</span>
                </div>

                <div class="guidelines-box">
                    <h4><i class="fa-solid fa-camera"></i> Audit Essentials:</h4>
                    <p style="margin-bottom: 1rem; font-size: 0.95rem;">To ensure your audit is valid:</p>
                    <ul>
                        <li>Capture all photos and videos using the <strong>Timestamp Camera App</strong>.</li>
                        <li>Make sure every photo/video includes a <strong>visible timestamp</strong> and <strong>geo-tagged location</strong>.</li>
                        <li>Available on <strong>Windows, Mac, iOS, and Android</strong>.</li>
                    </ul>
                </div>

                <div class="rating-guide-box">
                    <h4><i class="fa-solid fa-star"></i> Rating Guide:</h4>
                    <div class="rating-grid">
                        <span class="r-1">⭐ 1 Star</span> <span>Very Poor / Unacceptable</span>
                        <span class="r-2">⭐⭐ 2 Stars</span> <span>Poor / Below Average</span>
                        <span class="r-3">⭐⭐⭐ 3 Stars</span> <span>Average / Acceptable</span>
                        <span class="r-4">⭐⭐⭐⭐ 4 Stars</span> <span>Good / Above Average</span>
                        <span class="r-5">⭐⭐⭐⭐⭐ 5 Stars</span> <span>Excellent / Outstanding</span>
                    </div>
                </div>

                <div style="margin: 2rem 0 1rem 0; text-align: center;">
                    <h3 style="color: var(--primary); margin-bottom: 0.5rem;">🚀 Ready to Make an Impact?</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem;">Start your audit now and help us raise the bar with every journey.</p>
                </div>

                <button type="button" class="btn btn-submit" style="width: 100%; justify-content: center; margin: 0; padding: 1rem;" onclick="window.app.nextStep()">
                    Start My Audit <i class="fa-solid fa-play"></i>
                </button>
            </div>
        `;
        this.elements.renderArea.innerHTML = html;
        this.elements.btnBack.style.display = 'none';
        this.elements.btnNext.style.display = 'none';
        this.elements.btnSubmit.style.display = 'none';
        window.scrollTo(0, 0);
    }

    renderQuestion(q) {
        let val = this.formData[q.id] || "";
        const isHidden = q.hidden ? 'style="display:none"' : '';
        const isRating = q.type === 'rating';
        const isHeading = q.type === 'heading';

        let questionHtml = `<div class="question-group ${isRating ? 'inline-stars' : ''}" id="q_wrapper_${q.id}" ${isHidden}>`;

        if (!isHeading && !isRating) {
            questionHtml += `<label class="question-label">${q.label} ${q.required ? '<span class="required">*</span>' : ''}</label>
            ${q.note ? `<p class="rating-label-text">${q.note}</p>` : ''}`;
        }


        switch (q.type) {
            case 'heading':
                questionHtml += `<div class="bunch-heading" style="margin-top: 2rem; margin-bottom: 1rem; padding: 0.75rem 1rem; background: var(--primary); color: white; border-radius: 8px; font-weight: 800; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 10px rgba(0,69,173,0.15); display: flex; align-items: center; gap: 0.75rem;">
                    <i class="fa-solid fa-list-check"></i> ${q.label}
                </div>`;
                break;
            case 'text':
            case 'number':
                if (q.id === 'pnr') {
                    questionHtml += `
                        <div class="input-wrapper">
                            <span class="input-prefix">${q.prefix}</span>
                            <div class="pnr-input-container" style="flex: 1; position: relative;">
                                <input type="text" id="pnr-input" name="${q.id}" value="${val}" placeholder=" " maxlength="7" inputmode="numeric" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                                <label for="pnr-input" class="pnr-fading-label">${q.floatingLabel || q.label}</label>
                            </div>
                        </div>
                    `;
                } else if (q.prefix) {
                    questionHtml += `
                        <div class="input-wrapper">
                            <span class="input-prefix">${q.prefix}</span>
                            <input type="${q.type}" name="${q.id}" value="${val}" placeholder="${q.placeholder || ''}" ${q.max ? `maxlength="${q.max}"` : ''}>
                        </div>
                    `;
                } else {
                    questionHtml += `<input type="${q.type}" name="${q.id}" value="${val}" placeholder="${q.placeholder || ''}" ${q.max ? `maxlength="${q.max}"` : ''}>`;
                }
                break;
            case 'select':
                questionHtml += `<select name="${q.id}"><option value="">Select Option</option>`;
                q.options.forEach(opt => {
                    questionHtml += `<option value="${opt}" ${val == opt ? 'selected' : ''}>${opt}</option>`;
                });
                questionHtml += `</select>`;
                break;
            case 'textarea':
                questionHtml += `<textarea name="${q.id}" placeholder="Type here...">${val}</textarea>`;
                break;
            case 'radio':
                questionHtml += `<div class="radio-group">`;
                q.options.forEach(opt => {
                    questionHtml += `
                        <label class="checkbox-item">
                            <input type="radio" name="${q.id}" value="${opt}" ${val == opt ? 'checked' : ''}>
                            <span>${opt}</span>
                        </label>
                    `;
                });
                questionHtml += `</div>`;
                break;
            case 'checkbox':
                questionHtml += `<div class="checkbox-grid">`;
                q.options.forEach(opt => {
                    const isChecked = Array.isArray(val) && val.includes(opt);
                    questionHtml += `
                        <label class="checkbox-item">
                            <input type="checkbox" name="${q.id}" value="${opt}" ${isChecked ? 'checked' : ''}>
                            <span>${opt}</span>
                        </label>
                    `;
                });
                questionHtml += `</div>`;
                break;
            case 'rating':
                // Flex container to allow question wrapping while keeping stars on right
                questionHtml += `<div class="rating-inline-container" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; width: 100%; border-bottom: 1px solid var(--border); padding: 1.25rem 0;">`;

                // Label (Moved inside for better flex control)
                questionHtml += `<label class="question-label" style="margin-bottom: 0; flex: 1 1 200px; font-weight: 700;">${q.label} ${q.required ? '<span class="required">*</span>' : ''}</label>`;

                // Stars Wrapper (Guaranteed fixed width for vertical symmetry)
                questionHtml += `<div class="rating-wrapper-v2" style="display: flex; flex-direction: column; align-items: center; flex: 1 1 250px; width: 100%; max-width: 100%;">`;
                questionHtml += `<div class="star-rating-v2" id="rating_${q.id}">`;
                const ratingVal = parseInt(val);
                for (let i = 1; i <= 5; i++) {
                    const isActive = ratingVal && i <= ratingVal;
                    const ratingClass = isActive ? (ratingVal <= 3 ? 'rating-low' : 'rating-high') : '';
                    questionHtml += `
                        <div class="star-item" style="display: flex; justify-content: center;">
                            <input type="radio" id="star_${q.id}_${i}" name="${q.id}" value="${i}" ${val == i ? 'checked' : ''} style="display:none">
                            <label for="star_${q.id}_${i}" class="star-label ${isActive ? 'active' : ''} ${ratingClass}" data-value="${i}" style="font-size: 2rem; cursor: pointer; transition: all 0.2s;">
                                <i class="fa-solid fa-star"></i>
                            </label>
                        </div>
                    `;
                }
                questionHtml += `</div>`;

                // Legends (Strictly aligned under stars)
                questionHtml += `
                    <div class="rating-legends">
                        <span class="rating-legend-item">Very Poor</span>
                        <span class="rating-legend-item"></span>
                        <span class="rating-legend-item"></span>
                        <span class="rating-legend-item"></span>
                        <span class="rating-legend-item">Excellent</span>
                    </div>
                </div>`; // end rating-wrapper-v2

                questionHtml += `</div>`; // end rating-inline-container

                const showDesc = !!val;
                questionHtml += `
                    <div id="desc_box_${q.id}" class="conditional-box" style="margin-top:1.5rem; display:${showDesc ? 'block' : 'none'}; width: 100%;">
                        <label class="question-label" style="font-size:0.9rem">${q.descriptionLabel || 'Please provide details:'} <span class="required">*</span></label>
                        <textarea name="${q.id}_desc" maxlength="2000" placeholder="Describe the reason for this rating..." ${showDesc ? 'required' : ''}>${this.formData[q.id + '_desc'] || ''}</textarea>
                    </div>
                `;
                break;
            case 'file':
                const fileList = this.filesData[q.id] || [];
                questionHtml += `
                    <div class="file-upload-container ${fileList.length > 0 ? 'has-file' : ''}" id="file_container_${q.id}" 
                         style="border: 2px dashed ${fileList.length > 0 ? 'var(--success)' : 'var(--border)'}; position: relative; min-height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.5rem; border-radius: 12px; transition: all 0.3s ease;">
                        <i class="fa-solid ${fileList.length > 0 ? 'fa-file-circle-check' : 'fa-cloud-arrow-up'}" 
                           style="font-size: 2rem; margin-bottom: 0.5rem; color: ${fileList.length > 0 ? 'var(--success)' : 'var(--primary)'}"></i>
                        <span class="upload-label" style="font-weight: 600; text-align: center;">
                            ${fileList.length > 0 ? `Captured ${fileList.length} file(s)` : 'Click to upload files (Max 10)'}
                        </span>
                        ${fileList.length > 0 ? `
                            <div class="file-names-list" style="font-size: 0.75rem; margin-top: 0.75rem; color: var(--text-muted); display: flex; flex-wrap: wrap; gap: 4px; justify-content: center; position: relative; z-index: 20;">
                                ${fileList.map((f, i) => `
                                    <span class="file-name-tag" style="background: rgba(0,0,0,0.05); padding: 2px 8px; border-radius: 4px; border: 1px solid var(--border); display: inline-flex; align-items: center; gap: 6px;">
                                        ${f.name}
                                        <i class="fa-solid fa-xmark" style="cursor: pointer; color: #ff4757; padding: 2px;" onclick="event.preventDefault(); event.stopPropagation(); window.app.removeFile('${q.id}', ${i})"></i>
                                    </span>
                                `).join('')}
                            </div>
                            <button type="button" class="btn btn-secondary" onclick="event.preventDefault(); event.stopPropagation(); window.app.clearFiles('${q.id}')" style="margin-top: 1rem; font-size: 0.7rem; padding: 4px 10px; position: relative; z-index: 20;">
                                <i class="fa-solid fa-trash-can"></i> Clear All
                            </button>
                        ` : ''}
                        <input type="file" name="${q.id}" accept="${q.accept || '*'}" multiple 
                               style="opacity:0; position:absolute; left:0; top:0; width:100%; height:100%; cursor:pointer; z-index: 10;">
                    </div>
                `;
                break;
        }

        questionHtml += `</div>`;
        return questionHtml;
    }

    renderPassengerSection() {
        const valStatus = this.formData['feedback_recorded'] || "";
        // Render section questions first (the list of 10)
        let html = '';
        const section = SECTIONS_CONFIG[11]; // Section 12: Passenger Feedbacks
        section.questions.forEach(q => {
            html += this.renderQuestion(q);
        });


        html += `<div id="passengers-list" style="display:${valStatus === 'Yes' ? 'block' : 'none'}">`;
        this.passengers.forEach((p, index) => {
            html += `
                <div class="passenger-card" style="border: 1px solid var(--border); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; background: var(--bg-light)">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem">
                        <h4 style="color:var(--primary)">Passenger ${index + 1}</h4>
                        ${index > 0 ? `<button type="button" class="btn-delete" onclick="window.app.removePassenger(${p.id})"><i class="fa-solid fa-trash"></i></button>` : ''}
                    </div>
                    
                    <div class="question-group">
                        <label class="question-label">Passenger Name <span class="required">*</span></label>
                        <input type="text" name="p_name_${p.id}" value="${p.name}" placeholder="Letters only" oninput="this.value = this.value.replace(/[^a-zA-Z\\s]/g, '')">
                    </div>

                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem">
                        <div class="question-group">
                            <label class="question-label">Seat Type <span class="required">*</span></label>
                            <select name="p_seatType_${p.id}" onchange="window.app.handlePassengerSeatChange(${p.id}, this.value)">
                                <option value="">Select Type</option>
                                <option value="Seater" ${p.seatType === 'Seater' ? 'selected' : ''}>Seater</option>
                                <option value="Sleeper" ${p.seatType === 'Sleeper' ? 'selected' : ''}>Sleeper</option>
                            </select>
                        </div>
                        <div class="question-group">
                            <label class="question-label">Seat No. <span class="required">*</span></label>
                            <select name="p_seatNo_${p.id}" ${!p.seatType ? 'disabled' : ''}>
                                <option value="">Select No.</option>
                                ${this.getSeatOptions(p.seatType).map(n => `<option value="${n}" ${p.seatNo == n ? 'selected' : ''}>${n}</option>`).join('')}
                            </select>
                        </div>
                    </div>

                    <div class="question-group">
                        <label class="question-label">Positive Feedback(s) <span class="required">*</span></label>
                        <textarea name="p_good_${p.id}" maxlength="2000" placeholder="Positive highlights from passenger...">${p.good || ''}</textarea>
                    </div>
                    <div class="question-group">
                        <label class="question-label">Negative Feedback(s) <span class="required">*</span></label>
                        <textarea name="p_wrong_${p.id}" maxlength="2000" placeholder="Areas of improvement mentioned by passenger...">${p.wrong || ''}</textarea>
                    </div>

                    <div class="file-upload-container ${this.filesData[`p_media_${p.id}`] ? 'has-file' : ''}" 
                         style="border: 2px dashed ${this.filesData[`p_media_${p.id}`] ? 'var(--success)' : 'var(--border)'}; position: relative; padding: 1.5rem; border-radius: 12px; margin-top: 1rem; display: flex; flex-direction: column; align-items: center; transition: all 0.3s ease;">
                         <i class="fa-solid ${this.filesData[`p_media_${p.id}`] ? 'fa-circle-check' : 'fa-microphone'}" 
                            style="font-size: 1.5rem; margin-bottom: 0.5rem; color: ${this.filesData[`p_media_${p.id}`] ? 'var(--success)' : 'var(--primary)'}"></i>
                         <span class="upload-label" style="font-weight: 600; font-size: 0.9rem; text-align: center;">
                            ${this.filesData[`p_media_${p.id}`] ? `Captured ${this.filesData[`p_media_${p.id}`].length} file(s)` : 'Upload Feedback Audio/Video'}
                         </span>
                         ${this.filesData[`p_media_${p.id}`] ? `
                            <div class="file-names-list" style="font-size: 0.75rem; margin-top: 0.75rem; color: var(--text-muted); display: flex; flex-wrap: wrap; gap: 4px; justify-content: center; position: relative; z-index: 20;">
                                ${this.filesData[`p_media_${p.id}`].map((f, i) => `
                                    <span class="file-name-tag" style="background: rgba(0,0,0,0.05); padding: 2px 8px; border-radius: 4px; border: 1px solid var(--border); display: inline-flex; align-items: center; gap: 6px;">
                                        ${f.name}
                                        <i class="fa-solid fa-xmark" style="cursor: pointer; color: #ff4757; padding: 2px;" onclick="event.preventDefault(); event.stopPropagation(); window.app.removeFile('p_media_${p.id}', ${i})"></i>
                                    </span>
                                `).join('')}
                            </div>
                            <button type="button" class="btn btn-secondary" onclick="event.preventDefault(); event.stopPropagation(); window.app.clearFiles('p_media_${p.id}')" style="margin-top: 0.75rem; font-size: 0.7rem; padding: 4px 10px; position: relative; z-index: 20;">
                                <i class="fa-solid fa-trash-can"></i> Clear All
                            </button>
                         ` : ''}
                         <input type="file" name="p_media_${p.id}" accept="audio/*,video/*,image/*" multiple
                                style="opacity:0; position:absolute; left:0; top:0; width:100%; height:100%; cursor:pointer; z-index: 10;">
                    </div>
                </div>
            `;
        });

        html += `
            <button type="button" class="btn btn-secondary" onclick="window.app.addPassenger()" style="width:100%">
                <i class="fa-solid fa-plus"></i> Add Another Passenger
            </button>
            <p style="font-size:0.75rem; color:var(--error); margin-top:1rem; font-weight:600">
                ⚠️ Please record actual passenger responses only. Fake entries may lead to rejection.
            </p>
        </div>`;
        return html;
    }

    getSeatOptions(type) {
        if (type === 'Seater') return Array.from({ length: 50 }, (_, i) => i + 1);
        if (type === 'Sleeper') return Array.from({ length: 20 }, (_, i) => i + 1);
        return [];
    }

    setRating(id, val) {
        this.formData[id] = val;
        this.saveDraft();
        this.render();
    }

    addPassenger() {
        this.passengers.push({ id: Date.now(), name: "", seatType: "", seatNo: "", feedback: "" });
        this.saveDraft();
        this.render();
    }

    removePassenger(id) {
        this.passengers = this.passengers.filter(p => p.id !== id);
        this.saveDraft();
        this.render();
    }

    handlePassengerSeatChange(id, type) {
        const p = this.passengers.find(p => p.id === id);
        if (p) {
            p.seatType = type;
            p.seatNo = "";
            this.saveDraft();
            this.render();
        }
    }

    syncVisibility() {
        // Sync any conditional logic on initial render of section
        const section = SECTIONS_CONFIG[this.currentStep];
        section.questions.forEach(q => {
            const val = this.formData[q.id];
            if (val) this.checkConditionals(q.id, val);
        });

        if (section.id === 12) {
            const feedbackRecorded = this.formData['feedback_recorded'];
            const pList = document.getElementById('passengers-list');
            if (pList) pList.style.display = feedbackRecorded === 'Yes' ? 'block' : 'none';
        }
    }

    nextStep() {
        this.saveDraft();
        if (this.currentStep < SECTIONS_CONFIG.length - 1) {
            this.currentStep++;
        }
        this.render();
        this.updateProgress();
    }

    prevStep() {
        this.saveDraft();
        if (this.currentStep > 0) {
            this.currentStep--;
        }
        this.render();
        this.updateProgress();
    }

    isSectionValid(idx) {
        if (idx === -1) return true;
        const section = SECTIONS_CONFIG[idx];
        if (!section) return true;

        let hiddenFields = new Set();
        section.questions.forEach(q => {
            if (q.conditional) {
                const val = this.formData[q.id];
                Object.values(q.conditional).flat().forEach(id => hiddenFields.add(id));
                if (val) {
                    const rules = q.conditional[val] || [];
                    rules.forEach(id => hiddenFields.delete(id));
                }
            }
        });

        for (let q of section.questions) {
            if (q.type === 'heading') continue;
            if (hiddenFields.has(q.id)) continue;

            let val = this.formData[q.id];
            if (q.type === 'file') val = this.filesData[q.id];

            if (q.required && (!val || (Array.isArray(val) && val.length === 0))) {
                return false;
            }
            if (val && q.validation && !q.validation.test(val)) {
                return false;
            }
            if (q.id === 'pnr' && val && val.length !== 7) {
                return false;
            }
        }

        if (section.id === 12 && this.formData['feedback_recorded'] === 'Yes') {
            for (let p of this.passengers) {
                if (!p.name || !p.seatType || !p.seatNo || !p.good || !p.wrong) return false;
            }
        }

        return true;
    }

    validateCurrent(silent = false) {
        if (this.currentStep === -1) return true;
        const section = SECTIONS_CONFIG[this.currentStep];
        let isValid = true;
        let firstError = null;

        // Default section validation
        section.questions.forEach(q => {
            const wrapper = document.getElementById(`q_wrapper_${q.id}`);
            if (wrapper && wrapper.style.display !== 'none') {
                let val = this.formData[q.id];
                if (q.type === 'file') val = this.filesData[q.id];

                let isFieldValid = true;

                if (q.required && (!val || (Array.isArray(val) && val.length === 0))) {
                    isFieldValid = false;
                } else if (val && q.validation && !q.validation.test(val)) {
                    isFieldValid = false;
                } else if (q.id === 'pnr' && val && val.length !== 7) {
                    isFieldValid = false;
                    q.validationMsg = "PNR must be exactly 7 digits.";
                }

                if (!isFieldValid) {
                    isValid = false;
                    this.markError(q.id, q.validationMsg || "This field is required", wrapper);
                    if (!firstError) firstError = wrapper;
                } else {
                    const descEl = document.getElementById(`desc_box_${q.id}`);
                    if (descEl && descEl.style.display !== 'none') {
                        const descVal = this.formData[`${q.id}_desc`];
                        if (!descVal || !descVal.trim() || descVal === "N/A") {
                            isFieldValid = false;
                            isValid = false;
                            this.markError(q.id, "Please provide details in the description box below the rating.", wrapper);
                            if (!firstError) firstError = wrapper;
                        } else {
                            this.clearError(q.id, wrapper);
                        }
                    } else {
                        this.clearError(q.id, wrapper);
                    }
                }
            }
        });

        // Passenger specific validation
        if (section.id === 12 && this.formData['feedback_recorded'] === 'Yes') {
            this.passengers.forEach(p => {
                const fields = ['name', 'seatType', 'seatNo', 'good', 'wrong'];
                fields.forEach(f => {
                    const elId = `p_${f}_${p.id}`;
                    const el = document.getElementsByName(elId)[0];
                    if (el && !p[f]) {
                        isValid = false;
                        el.style.border = '1px solid var(--error)';
                        if (!firstError) firstError = el;
                    } else if (el) {
                        el.style.border = '';
                    }
                });
            });
        }

        if (!isValid && !silent) {
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return isValid;
    }

    markError(id, msg, wrapperEl) {
        const wrapper = wrapperEl || document.getElementById(`q_wrapper_${id}`);
        if (wrapper) {
            wrapper.classList.add('error');
            let errorMsg = wrapper.querySelector('.error-msg');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-msg';
                wrapper.appendChild(errorMsg);
            }
            errorMsg.innerText = msg;
        }
    }

    clearError(id, wrapperEl) {
        const wrapper = wrapperEl || document.getElementById(`q_wrapper_${id}`);
        if (wrapper) {
            wrapper.classList.remove('error');
            const errorMsg = wrapper.querySelector('.error-msg');
            if (errorMsg) errorMsg.remove();
        }
    }

    updateProgress() {
        const total = SECTIONS_CONFIG.length;
        let completed = 0;

        for (let i = 0; i < total; i++) {
            if (this.isSectionValid(i)) {
                completed++;
            }
        }

        const percent = Math.round((completed / total) * 100);

        const elPercent = this.elements.progressBar('progress-percent');
        const elBar = this.elements.progressBar('progress-bar-fill');
        const elText = this.elements.progressBar('progress-text');
        const elMsg = this.elements.progressBar('motivational-msg');

        if (elPercent) elPercent.innerText = `${percent}%`;
        if (elBar) elBar.style.width = `${percent}%`;
        if (elText) elText.innerText = `Sections ${completed}/${total}`;

        const msgs = [
            "Great start! Keep going. 🚀",
            "You're making good progress! 👍",
            "Halfway there! You're doing awesome. ✨",
            "Almost finished! Just a few more. 🏁",
            "Final stretch! Ready to submit? 🏆"
        ];
        const msgIdx = Math.min(Math.floor((percent / 100) * (msgs.length - 1)), msgs.length - 1);
        if (elMsg) elMsg.innerText = msgs[msgIdx];
    }


    showPreview() {
        // Enforce final submission validation
        const total = SECTIONS_CONFIG.length;
        let incompleteSections = [];

        for (let i = 0; i < total; i++) {
            if (!this.isSectionValid(i)) {
                incompleteSections.push(SECTIONS_CONFIG[i].title);
            }
        }

        if (incompleteSections.length > 0) {
            alert("Kindly fill all the sections in order to complete your flying audit.\n\nIncomplete:\n- " + incompleteSections.join('\n- '));
            return;
        }

        const modal = document.getElementById('preview-modal');
        const content = document.getElementById('preview-data');

        let html = `<div class="preview-summary">`;
        SECTIONS_CONFIG.forEach(sec => {
            html += `<h3 style="margin-top:1.5rem; color:var(--primary); border-bottom:1px solid var(--border)">${sec.title}</h3>`;
            sec.questions.forEach(q => {
                let val = this.formData[q.id];
                if (val) {
                    if (q.prefix) val = `${q.prefix}-${val}`;
                    html += `<p><strong>${q.label}:</strong> ${Array.isArray(val) ? val.join(', ') : val}</p>`;
                }
            });
        });
        html += `</div>`;

        content.innerHTML = html;

        // Add Edit logic to modal actions if needed, but the close button already serves as 'Go back to edit'
        // Let's add a clear 'Back to Edit' button for clarity
        const modalActions = document.querySelector('.modal-actions');
        if (!document.getElementById('btn-review-edit')) {
            const editBtn = document.createElement('button');
            editBtn.id = 'btn-review-edit';
            editBtn.type = 'button';
            editBtn.className = 'btn btn-secondary';
            editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Back to Edit';
            editBtn.onclick = () => modal.style.display = 'none';
            modalActions.prepend(editBtn);
        }

        modal.style.display = 'block';
    }

    async finalizeSubmission() {
        if (!window.confirm("Submit Audit? 🚀")) return;

        const submitBtn = document.getElementById('confirm-submit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Submitting...';

        // Yield to allow the browser to render the "Submitting..." text before freezing the UI
        setTimeout(async () => {
            const cleanFilesData = {};
            for (let fieldId in this.filesData) {
                const files = this.filesData[fieldId];
                if (Array.isArray(files)) {
                    const validFiles = files.filter(f => f.name !== 'dummy_auto_file.txt');
                    if (validFiles.length > 0) {
                        cleanFilesData[fieldId] = validFiles;
                    }
                }
            }

            // Sanitize formData so Google Sheets always receives clean, readable strings
            const sanitizedResponses = {};
            for (const key in this.formData) {
                const val = this.formData[key];

                if (key === 'passengers' && Array.isArray(val)) {
                    // Format passenger list as numbered, labelled rows
                    sanitizedResponses[key] = val.map((p, idx) => {
                        const parts = [];
                        if (p.name) parts.push(`Name: ${p.name}`);
                        if (p.seatType) parts.push(`Seat Type: ${p.seatType}`);
                        if (p.seatNo) parts.push(`Seat No: ${p.seatNo}`);
                        if (p.good) parts.push(`Positive: ${p.good}`);
                        if (p.wrong) parts.push(`Negative: ${p.wrong}`);
                        return `Passenger ${idx + 1} → ${parts.length ? parts.join(' | ') : 'No details'}`;
                    }).join('\n');
                } else if (Array.isArray(val)) {
                    // Flat array of primitives (checkbox selections) → comma-separated
                    sanitizedResponses[key] = val.join(', ');
                } else if (val !== null && typeof val === 'object') {
                    sanitizedResponses[key] = JSON.stringify(val);
                } else {
                    sanitizedResponses[key] = val;
                }
            }


            const payload = {
                responses: sanitizedResponses,
                files: cleanFilesData,
                headerMap: this.generateHeaderMap(),
                sectionMap: this.generateSectionMap()
            };

            try {
                const response = await fetch(CONFIG.GAS_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify(payload)
                });

                // Even with no-cors, we assume success if no error is thrown
                document.getElementById('preview-modal').style.display = 'none';
                document.getElementById('success-screen').style.display = 'flex';
                localStorage.removeItem('freshbus_draft');
                window.scrollTo(0, 0);
            } catch (e) {
                console.error("Submission error:", e);
                alert("Failed to connect to Google. Please check your internet.");
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Try Again';
            }
        }, 50);
    }

    generateHeaderMap() {
        const map = {};
        SECTIONS_CONFIG.forEach(sec => {
            let currentHeading = "";
            sec.questions.forEach(q => {
                if (q.type === 'heading') currentHeading = q.label;
                else if (q.id) {
                    map[q.id] = `[${sec.title}] ${currentHeading ? `[${currentHeading}] ` : ''}${q.label}`;
                    if (q.descriptionTrigger) {
                        map[`${q.id}_desc`] = `[DETAILS] ${map[q.id]}`;
                    }
                }
            });
        });

        this.passengers.forEach((p, idx) => {
            map[`p_name_${p.id}`] = `[Section 12] Passenger ${idx + 1} Name`;
            map[`p_seatType_${p.id}`] = `[Section 12] Passenger ${idx + 1} Seat Type`;
            map[`p_seatNo_${p.id}`] = `[Section 12] Passenger ${idx + 1} Seat No`;
            map[`p_good_${p.id}`] = `[Section 12] Passenger ${idx + 1} Positive Feedback`;
            map[`p_wrong_${p.id}`] = `[Section 12] Passenger ${idx + 1} Negative Feedback`;
        });

        return map;
    }

    generateSectionMap() {
        const map = {};
        SECTIONS_CONFIG.forEach(sec => {
            sec.questions.forEach(q => {
                if (q.id) map[q.id] = sec.title;
            });
        });
        // Route passenger media to Section 12
        this.passengers.forEach(p => {
            map[`p_media_${p.id}`] = "Section 12 - Passenger Feedbacks";
        });
        return map;
    }

    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            if (!file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result.split(',')[1]);
                reader.onerror = error => reject(error);
                return;
            }

            const img = new Image();
            const url = URL.createObjectURL(file);
            img.onload = () => {
                URL.revokeObjectURL(url);
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                const MAX = 1024;
                if (width > height && width > MAX) {
                    height *= MAX / width;
                    width = MAX;
                } else if (height > MAX) {
                    width *= MAX / height;
                    height = MAX;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
                resolve(dataUrl.split(',')[1]);
            };
            img.onerror = () => reject(new Error('Image load error'));
            img.src = url;
        });
    }

    clearFiles(fieldId) {
        if (confirm("Remove all files from this section?")) {
            delete this.filesData[fieldId];
            this.render();
            this.showToast("All files removed.");
        }
    }

    removeFile(fieldId, index) {
        if (confirm("Remove this specific file?")) {
            this.filesData[fieldId].splice(index, 1);
            if (this.filesData[fieldId].length === 0) {
                delete this.filesData[fieldId];
            }
            this.render();
            this.showToast("File removed.");
        }
    }

    fillAllAndGo() {
        if (!confirm("This will fill all required fields with test data. Proceed?")) return;

        SECTIONS_CONFIG.forEach((sec, idx) => {
            sec.questions.forEach(q => {
                if (q.id) {
                    if (q.type === 'text' || q.type === 'number') {
                        this.formData[q.id] = q.id === 'pnr' ? '1234567' : 'Test Data';
                    } else if (q.type === 'textarea') {
                        this.formData[q.id] = 'Auto-filled test response.';
                    } else if (q.type === 'rating') {
                        this.formData[q.id] = "4";
                    } else if (q.type === 'select') {
                        this.formData[q.id] = q.options[0];
                    } else if (q.type === 'radio') {
                        this.formData[q.id] = q.options[0];
                    } else if (q.type === 'checkbox') {
                        this.formData[q.id] = [q.options[0]];
                    } else if (q.type === 'file') {
                        if (idx < SECTIONS_CONFIG.length - 1) {
                            this.filesData[q.id] = [{
                                name: 'dummy_auto_file.txt',
                                type: 'text/plain',
                                base64: 'ZHVtbXk='
                            }];
                        }
                    }
                }
            });
        });

        this.currentStep = SECTIONS_CONFIG.length - 1;
        this.saveDraft();
        this.render();
        this.updateProgress();
    }
}

window.app = new FreshBusAudit();
