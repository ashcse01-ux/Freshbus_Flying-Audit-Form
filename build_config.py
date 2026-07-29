import json

SECTIONS_CONFIG = [
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
                "required": True,
                "prefix": "FRE",
                "placeholder": " ",
                "validationRegex": "^\\d{7}$",
                "validationMsg": "Required exactly 7 digits."
            },
            {
                "id": "service_route",
                "type": "select",
                "label": "Service Route",
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True
            },
            {
                "id": "s2_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Staff Behaviour & Professionalism",
                "required": True
            },
            {
                "id": "s2_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": True
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True
            },
            {
                "id": "s3_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Pickup Responsibilities",
                "required": True
            },
            {
                "id": "s3_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": True
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "hidden": True
            },
            {
                "id": "s4_c1",
                "type": "rating",
                "label": "Seat cushioning comfortable for journey",
                "required": True,
                "hidden": True,
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
                "required": True,
                "hidden": True,
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
                "required": True,
                "hidden": True,
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
                "required": True,
                "hidden": True,
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
                "hidden": True
            },
            {
                "id": "s4_sa1",
                "type": "rating",
                "label": "Floor clean without litter or dust",
                "required": True,
                "hidden": True,
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
                "required": True,
                "hidden": True,
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
                "required": True,
                "hidden": True,
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
                "required": True,
                "hidden": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "hidden": True
            },
            {
                "id": "s4_b1",
                "type": "rating",
                "label": "Bottle Holders clean and functional?",
                "required": True,
                "hidden": True,
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
                "required": True,
                "hidden": True,
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
                "hidden": True
            },
            {
                "id": "s4_b3",
                "type": "rating",
                "label": "Inside Cabin Luggage in Sleeper Compartments clean and not broken?",
                "required": True,
                "hidden": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "hidden": True
            },
            {
                "id": "s4_sleeper_clean",
                "type": "rating",
                "label": "Were the blankets, bedsheets, and pillows clean and well maintained?",
                "required": True,
                "hidden": True,
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
                "required": True
            },
            {
                "id": "s4_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Bus Cleanliness & Maintenance",
                "required": True
            },
            {
                "id": "s4_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": True
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True
            },
            {
                "id": "s5_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Driving & Technical Safety",
                "required": True
            },
            {
                "id": "s5_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": True
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
                "required": True,
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
                "required": True,
                "options": [
                    "Snack Box",
                    "Breakfast/Lunch/Dinner",
                    "Both"
                ]
            },
            {
                "type": "heading",
                "label": "Detailed Section Feedback"
            },
            {
                "id": "s6_good",
                "type": "textarea",
                "label": "Share your positive highlights for Food, Pitstop, & Charging",
                "required": True
            },
            {
                "id": "s6_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Food, Pitstop, & Charging",
                "required": True
            },
            {
                "id": "s6_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": True
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True
            },
            {
                "id": "s7_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Announcements",
                "required": True
            },
            {
                "id": "s7_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": True
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
                "required": True,
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
                "hidden": True
            },
            {
                "id": "s8_q3",
                "type": "radio",
                "label": "Did any staff ask for cash payment without providing an official receipt?",
                "required": True,
                "hidden": True,
                "options": [
                    "Yes",
                    "No"
                ]
            },
            {
                "id": "s8_q4",
                "type": "radio",
                "label": "Did staff request extra money for seat allocation or luggage?",
                "required": True,
                "hidden": True,
                "options": [
                    "Yes",
                    "No"
                ]
            },
            {
                "id": "s8_q5",
                "type": "radio",
                "label": "Did staff ask passengers to pay outside the official booking system?",
                "required": True,
                "hidden": True,
                "options": [
                    "Yes",
                    "No"
                ]
            },
            {
                "id": "s8_q6",
                "type": "radio",
                "label": "Did staff collect cash for a service normally included in the fare?",
                "required": True,
                "hidden": True,
                "options": [
                    "Yes",
                    "No"
                ]
            },
            {
                "id": "s8_q7",
                "type": "radio",
                "label": "Was any cash collected without clearly explaining the reason?",
                "required": True,
                "hidden": True,
                "options": [
                    "Yes",
                    "No"
                ]
            },
            {
                "id": "s8_q8",
                "type": "radio",
                "label": "Did you observe staff accepting cash from passengers discreetly?",
                "required": True,
                "hidden": True,
                "options": [
                    "Yes",
                    "No"
                ]
            },
            {
                "id": "s8_q9",
                "type": "radio",
                "label": "Did any passenger appear to board after paying cash directly?",
                "required": True,
                "hidden": True,
                "options": [
                    "Yes",
                    "No"
                ]
            },
            {
                "id": "s8_q10",
                "type": "radio",
                "label": "Was there any sign of unethical cash handling by staff?",
                "required": True,
                "hidden": True,
                "options": [
                    "Yes",
                    "No"
                ]
            },
            {
                "id": "s8_amount",
                "type": "text",
                "label": "Amount (Approx. in \u20b9)",
                "required": True,
                "hidden": True,
                "placeholder": "Enter the amount",
                "validationRegex": "^\\d{1,5}$",
                "validationMsg": "Only numbers up to 5 digits are allowed, no decimals or special characters."
            },
            {
                "id": "s8_staff",
                "type": "select",
                "label": "Staff Involved",
                "required": True,
                "hidden": True,
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
                "required": True,
                "hidden": True
            },
            {
                "type": "heading",
                "label": "Detailed Section Feedback"
            },
            {
                "id": "s8_good",
                "type": "textarea",
                "label": "Share your positive highlights for Pilferage Check",
                "required": False,
                "conditionalRequired": {
                    "questionId": "s8_q1",
                    "value": "Yes"
                }
            },
            {
                "id": "s8_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Pilferage Check",
                "required": False,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
                "hidden": True,
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
                "required": True,
                "hidden": True,
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
                "required": True,
                "hidden": True,
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
                "required": True,
                "hidden": True,
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
                "required": True,
                "hidden": True,
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
                "required": True,
                "hidden": True,
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
                "required": True,
                "hidden": True,
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
                "required": True,
                "hidden": True,
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
                "required": True,
                "hidden": True
            },
            {
                "type": "heading",
                "label": "Detailed Section Feedback"
            },
            {
                "id": "s9_good",
                "type": "textarea",
                "label": "Share your positive highlights for Delay Adherence",
                "required": False,
                "conditionalRequired": {
                    "questionId": "s9_q4",
                    "value": "Yes"
                }
            },
            {
                "id": "s9_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Delay Adherence",
                "required": False,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True
            },
            {
                "id": "s10_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Safety & Security",
                "required": True
            },
            {
                "id": "s10_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": True
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
                "required": True,
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
                "required": True,
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
                "required": True,
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
                "required": True
            },
            {
                "id": "s11_wrong",
                "type": "textarea",
                "label": "Mention any gaps or areas for improvement in Drop Responsibilities",
                "required": True
            },
            {
                "id": "s11_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": True
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
                "required": True,
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
                "required": True
            },
            {
                "id": "s13_negative_final",
                "type": "textarea",
                "label": "Any other final negative observation from the complete audit journey? *",
                "required": True
            },
            {
                "id": "s13_media",
                "type": "file",
                "label": " Section Media (Photos/Videos/Audio)",
                "required": True
            }
        ]
    }
]

if __name__ == "__main__":
    print(f"Loaded {len(SECTIONS_CONFIG)} sections successfully.")
