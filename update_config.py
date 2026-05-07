import json

# Fresh Bus Mystery Ride Audit Configuration - FULL 13 SECTIONS RESTORED & BIFURCATED
SECTIONS_CONFIG = [
    {
        "id": 1,
        "title": "Passenger Details",
        "description": "Capture basic ticket information to identify the mystery ride service.",
        "timeEst": "1 min",
        "questions": [
            { "id": "pnr", "type": "text", "label": "PNR Number", "floatingLabel": "Write 7 digit PNR Number", "required": True, "prefix": "FRE", "placeholder": " ", "validation": "REGEX_PNR", "validationMsg": "Required exactly 7 digits." },
            { 
                "id": "service_route", 
                "type": "select", 
                "label": "Service Route", 
                "required": True, 
                "options": [
                    "Hyderabad - Vijayawada", "Vijayawada - Hyderabad", 
                    "Bangalore - Chennai", "Chennai - Bangalore",
                    "Bangalore - Tirupati", "Tirupati - Bangalore",
                    "Visakhapatnam - Vijayawada", "Vijayawada - Visakhapatnam",
                    "Hyderabad - Guntur", "Guntur - Hyderabad",
                    "Chennai - Tirupati", "Tirupati - Chennai",
                    "Chennai - Pondicherry", "Pondicherry - Chennai",
                    "Hyderabad - Eluru", "Eluru - Hyderabad",
                    "Bangalore to Salem", "Salem to Bangalore",
                    "Bangalore to Erode", "Erode to Bangalore",
                    "Guntur - Visakhapatnam"
                ] 
            },
            { "id": "bus_type", "type": "select", "label": "Bus Type", "required": True, "options": ["SL", "SE", "SE/SL"] },
            { "id": "headcount", "type": "select", "label": "Number of total passengers (Last Boarding Point)", "required": True, "options": [str(i) for i in range(1, 101)] }
        ]
    },
    {
        "id": 2,
        "title": "Staff Behaviour & Professionalism",
        "description": "Evaluate how our captains and staff represent FreshBus.",
        "timeEst": "4 min",
        "questions": [
            { "type": "heading", "label": "Pre-Journey (Onboarding Call / Pre-boarding Contact)" },
            { "id": "s2_q1", "type": "rating", "label": "Greeted politely and introduced self with company name clearly", "required": True },
            { "id": "s2_q2", "type": "rating", "label": "Used respectful tone and comfortable, easy-to-understand language on Pre - Journey call", "required": True },
            
            { "type": "heading", "label": "Uniform & Grooming Adherence" },
            { "id": "s2_u1", "type": "rating", "label": "Captain and Co-Captain wearing Black Trousers and Blue Shirt", "required": True },
            { "id": "s2_u2", "type": "rating", "label": "Captain and Co-Captain wearing Black Shoes", "required": True },
            { "id": "s2_u2_socks", "type": "rating", "label": "Captain and Co-Captain wearing black socks with black shoes", "required": True },
            { "id": "s2_u3", "type": "rating", "label": "Well-groomed personality (Clean shaven/trimmed, neat hair)", "required": True },

            { "type": "heading", "label": "Staff Conduct & Discipline" },
            { "id": "s2_c1", "type": "rating", "label": "Did you observe Captain or Co-Captain eating tobacco or chewing gum?", "required": True },
            { "id": "s2_q16", "type": "rating", "label": "No shouting, rude language, or arguments with passengers", "required": True },

            { "type": "heading", "label": "Staff Presence & Responsiveness (During Journey)" },
            { "id": "s2_q9", "type": "rating", "label": "Staff visible, approachable, and available throughout journey", "required": True },
            { "id": "s2_q10", "type": "rating", "label": "Responded quickly to passenger needs without ignoring requests", "required": True },
            { "id": "s2_q11", "type": "rating", "label": "Maintained polite and respectful behavior at all times", "required": True },
            
            { "type": "heading", "label": "Delay & Disruption Management" },
            { "id": "s2_q12", "type": "rating", "label": "Delays communicated early with clear reasons and updates", "required": True },
            { "id": "s2_q13", "type": "rating", "label": "Passengers reassured calmly with apology and clarity", "required": True },
            { "id": "s2_q14", "type": "rating", "label": "Situations handled in organized manner without panic", "required": True },
            
            { "type": "heading", "label": "Special Passenger Assistance" },
            { "id": "s2_q15", "type": "rating", "label": "Elderly, children, and differently-abled passengers assisted properly", "required": True },
            { "id": "s2_f1", "type": "rating", "label": "Whether co-captain upfrontly explained and ensured all passengers to use motion sickness bag and provided to them?", "required": True },

            { "type": "heading", "label": "Mid-Route Stop Management" },
            { "id": "s2_q17", "type": "rating", "label": "Stops announced clearly with halt duration", "required": True },
            { "id": "s2_q18", "type": "rating", "label": "Ensured all passengers re-boarded with headcount check", "required": True },
            { "id": "s2_q19", "type": "rating", "label": "Assisted passengers during exit and re-boarding", "required": True }
        ]
    },
    {
        "id": 3,
        "title": "Pickup Responsibilities",
        "description": "Evaluate boarding efficiency and punctuality.",
        "timeEst": "3 min",
        "questions": [
            { "type": "heading", "label": "Pickup Timing" },
            { "id": "s3_p1", "type": "rating", "label": "Pickup point reached on time", "required": True },
            
            { "type": "heading", "label": "Onboarding Execution" },
            { "id": "s3_p2", "type": "rating", "label": "Captain or Co-Captain present on time and clearly visible at boarding point", "required": True },
            { "id": "s3_p3", "type": "rating", "label": "Passengers identified correctly with proper ticket verification", "required": True },
            { "id": "s3_p4", "type": "rating", "label": "Queue managed in organized manner without rush or confusion", "required": True },
            { "id": "s3_p5", "type": "rating", "label": "Captain or Co-Captain Maintained friendly, calm, and approachable first impression", "required": True },
            { "id": "s3_p6", "type": "rating", "label": "Co-Captain handed the luggage handled safely without damage or negligence", "required": True },
            { "id": "s3_p8", "type": "rating", "label": "Did the Co-Captain assist passengers with placing their luggage into the side compartment?", "required": True },
            { "id": "s3_p7", "type": "rating", "label": "Seat issues or conflicts resolved calmly and fairly", "required": True }
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
                "options": ["Seater", "Sleeper"],
                "conditional": {
                    "Seater": [
                        "h_seat_comfort", "s4_c1", "s4_c2", "s4_c3", "s4_c4",
                        "h_surrounding", "s4_sa1", "s4_sa2", "s4_sa3", "s4_sa4",
                        "h_seater_amenities", "s4_b1", "s4_b2"
                    ],
                    "Sleeper": [
                        "h_sleeper_amenities", "s4_b3",
                        "h_sleeper_comfort", "s4_q36", "s4_a1", "s4_a2", "s4_a3"
                    ]
                }
            },
            { "type": "heading", "label": "Pre-Boarding Cleanliness (First Impression)" },
            { "id": "s4_q1", "type": "rating", "label": "Bus exterior looked clean and maintained", "required": True },
            { "id": "s4_q2", "type": "rating", "label": "Entry steps clean and safe", "required": True },
            { "id": "s4_m1", "type": "rating", "label": "Floor mat was there and was clean", "required": True },

            { "type": "heading", "label": "SEAT CLEANLINESS & HYGIENE" },
            { "id": "s4_q5", "type": "rating", "label": "Seat surface clean and dust-free", "required": True },
            { "id": "s4_q6", "type": "rating", "label": "No stains or spill marks", "required": True },
            { "id": "s4_q6_a", "type": "rating", "label": "No leftover trash on seat", "required": True },
            { "id": "s4_q6_b", "type": "rating", "label": "Seat area properly sanitized", "required": True },

            { "id": "h_seat_comfort", "type": "heading", "label": "SEAT COMFORT & SPACE", "hidden": True },
            { "id": "s4_c1", "type": "rating", "label": "Seat cushioning comfortable for journey", "required": True, "hidden": True },
            { "id": "s4_c2", "type": "rating", "label": "Backrest support adequate and firm", "required": True, "hidden": True },
            { "id": "s4_c3", "type": "rating", "label": "Sufficient leg space available", "required": True, "hidden": True },
            { "id": "s4_c4", "type": "rating", "label": "Reclining function smooth and usable", "required": True, "hidden": True },

            { "id": "h_surrounding", "type": "heading", "label": "SURROUNDING AREA CLEANLINESS", "hidden": True },
            { "id": "s4_sa1", "type": "rating", "label": "Floor clean without litter or dust", "required": True, "hidden": True },
            { "id": "s4_sa2", "type": "rating", "label": "Aisle clear and obstruction-free", "required": True, "hidden": True },
            { "id": "s4_sa3", "type": "rating", "label": "Under-seat area clean and tidy", "required": True, "hidden": True },
            { "id": "s4_sa4", "type": "rating", "label": "Armrests and handles clean", "required": True, "hidden": True },

            { "type": "heading", "label": "WINDOWS, Curtains, FIXTURES & DOORS CONDITION" },
            { "id": "s4_q17", "type": "rating", "label": "Windows clean and smudge-free", "required": True },
            { "id": "s4_w1", "type": "rating", "label": "Curtains clean and properly maintained", "required": True },
            { "id": "s4_w2", "type": "rating", "label": "Curtain Hooks properly working and not damaged", "required": True },
            { "id": "s4_d1", "type": "rating", "label": "Was doors clean or not? Were they greasy?", "required": True },
            
            { "id": "h_seater_amenities", "type": "heading", "label": "Seater - Amenities Quality", "hidden": True },
            { "id": "s4_b1", "type": "rating", "label": "Bottle Holders clean and functional?", "required": True, "hidden": True },
            { "id": "s4_b2", "type": "rating", "label": "Magazine Holders clean and not broken?", "required": True, "hidden": True },
            
            { "id": "h_sleeper_amenities", "type": "heading", "label": "Sleeper Seat - Amenities Quality Check", "hidden": True },
            { "id": "s4_b3", "type": "rating", "label": "Inside Cabin Luggage in Sleeper Compartments clean and not broken?", "required": True, "hidden": True },

            { "type": "heading", "label": "AIR QUALITY & VENTILATION" },
            { "id": "s4_q21", "type": "rating", "label": "Air conditioning working properly", "required": True },
            { "id": "s4_av1", "type": "rating", "label": "Temperature maintained comfortably", "required": True },
            { "id": "s4_av2", "type": "rating", "label": "Airflow evenly distributed across bus", "required": True },
            { "id": "s4_av3", "type": "rating", "label": "No stuffy or suffocating feeling", "required": True },
            { "id": "s4_v1", "type": "rating", "label": "Were there loose AC fittings inside the bus?", "required": True },
            { "id": "s4_v2", "type": "rating", "label": "Was the Service Hatch of the bus clean or greasy?", "required": True },

            { "type": "heading", "label": "ODOUR & FRESHNESS" },
            { "id": "s4_q25", "type": "rating", "label": "No bad odour inside bus", "required": True },
            { "id": "s4_of1", "type": "rating", "label": "No smoke or fuel smell", "required": True },
            { "id": "s4_o1", "type": "rating", "label": "Was extreme air freshener used inside the bus?", "required": True },

            { "type": "heading", "label": "UTILITY FEATURES FUNCTIONALITY" },
            { "id": "s4_u1", "type": "rating", "label": "USB Port working properly or not?", "required": True },
            { "id": "s4_u2", "type": "rating", "label": "Type C Port working or not?", "required": True },
            { "id": "s4_uf1", "type": "rating", "label": "Reading lights functioning correctly or not ?", "required": True },

            { "type": "heading", "label": "NOISE & RIDE COMFORT" },
            { "id": "s4_nr1", "type": "rating", "label": "No excessive rattling noise", "required": True },
            { "id": "s4_nr2", "type": "rating", "label": "Cabin reasonably quiet during travel", "required": True },
            { "id": "s4_nr3", "type": "rating", "label": "No disturbing internal sounds", "required": True },
            { "id": "s4_nr4", "type": "rating", "label": "Smooth ride without discomfort", "required": True },

            { "id": "h_sleeper_comfort", "type": "heading", "label": "Sleeper - Comfort Amenities Quality", "hidden": True },
            { "id": "s4_q36", "type": "rating", "label": "Blankets clean and well-maintained", "required": True, "hidden": True },
            { "id": "s4_a1", "type": "rating", "label": "Pillow Covers clean and maintained?", "required": True, "hidden": True },
            { "id": "s4_a2", "type": "rating", "label": "Bedsheets clean and maintained?", "required": True, "hidden": True },
            { "id": "s4_a3", "type": "rating", "label": "Pillows clean and well maintained?", "required": True, "hidden": True },
            
            { "type": "heading", "label": "SAFETY EQUIPMENT CONDITION" },
            { "id": "s4_s1", "type": "rating", "label": "Was the fire extinguisher lock intact or broken?", "required": True },
            { "id": "s4_s2", "type": "rating", "label": "Hammer thread lock was intact or broken?", "required": True }
        ]
    },
    {
        "id": 5,
        "title": "Driving & Technical Safety",
        "description": "Road discipline, Captain & Co-Captain behavior, vehicle health, and safety compliance.",
        "timeEst": "5 min",
        "severity": "CRITICAL",
        "questions": [
            { "type": "heading", "label": "Captain Readiness Before Journey Start" },
            { "id": "s5_r1", "type": "rating", "label": "Captain appeared physically fit and alert before departure", "required": True },
            { "id": "s5_r2", "type": "rating", "label": "No visible signs of fatigue or drowsiness", "required": True },
            { "id": "s5_r3", "type": "rating", "label": "Captain posture confident and ready to drive", "required": True },
            { "id": "s5_r4", "type": "rating", "label": "Bus started smoothly without unusual delay", "required": True },
            { "id": "s5_r5", "type": "rating", "label": "No dashboard warning lights visible before departure", "required": True },
            { "id": "s5_r6", "type": "rating", "label": "Mirrors properly adjusted before starting journey", "required": True },
            { "id": "s5_water", "type": "rating", "label": "Water bottles sealed and clean", "required": True },

            { "type": "heading", "label": "Speed Compliance & Control (Critical)" },
            { "id": "s5_sp1", "type": "rating", "label": "Captain driving maintained speed within 80 km/h limit", "required": True },
            { "id": "s5_sp2", "type": "rating", "label": "Speed never exceeded 80 km/h at any time", "required": True },
            { "id": "s5_sp3", "type": "rating", "label": "Speed appropriate for road and traffic conditions", "required": True },
            { "id": "s5_sp4", "type": "rating", "label": "No sudden or unnecessary speed fluctuations", "required": True },
            { "id": "s5_sp5", "type": "rating", "label": "Acceleration and braking smooth and controlled", "required": True },

            { "type": "heading", "label": "Driving Smoothness & Vehicle Control" },
            { "id": "s5_sm1", "type": "rating", "label": "No sudden harsh braking during journey", "required": True },
            { "id": "s5_sm2", "type": "rating", "label": "No sharp or unsafe turns observed", "required": True },
            { "id": "s5_sm3", "type": "rating", "label": "No aggressive acceleration causing discomfort", "required": True },
            { "id": "s5_sm4", "type": "rating", "label": "Driving felt smooth and well controlled", "required": True },
            { "id": "s5_sm5", "type": "rating", "label": "Bus movement stable without jerks or shocks", "required": True },

            { "type": "heading", "label": "Road Discipline & Rule Compliance" },
            { "id": "s5_rd1", "type": "rating", "label": "Captain followed lane discipline consistently", "required": True },
            { "id": "s5_rd2", "type": "rating", "label": "Traffic signals and road signs properly obeyed", "required": True },
            { "id": "s5_rd3", "type": "rating", "label": "Safe distance maintained from other vehicles", "required": True },
            { "id": "s5_rd4", "type": "rating", "label": "No unsafe or risky overtaking observed", "required": True },

            { "type": "heading", "label": "Honking Behavior & Noise Discipline" },
            { "id": "s5_h1", "type": "rating", "label": "Avoided unnecessary or excessive honking", "required": True },
            { "id": "s5_h2", "type": "rating", "label": "Horn used only when genuinely required", "required": True },
            { "id": "s5_h3", "type": "rating", "label": "No aggressive or continuous honking behavior", "required": True },

            { "type": "heading", "label": "Night Driving Safety" },
            { "id": "s5_n1", "type": "rating", "label": "Speed controlled properly during night travel", "required": True },
            { "id": "s5_n2", "type": "rating", "label": "Captain remained alert and attentive at night", "required": True },
            { "id": "s5_n3", "type": "rating", "label": "Proper headlight usage and dimming observed", "required": True },
            { "id": "s5_n4", "type": "rating", "label": "No signs of drowsiness while driving", "required": True },
            { "id": "s5_n5", "type": "rating", "label": "Extra caution taken in low visibility areas", "required": True },

            { "type": "heading", "label": "Captain & Co-Captain Focus & Distraction Avoidance" },
            { "id": "s5_f1", "type": "rating", "label": "Captain & Co-Captain did not use mobile phone or earphones while driving", "required": True },
            { "id": "s5_f2", "type": "rating", "label": "No distractions affecting driving attention", "required": True },
            { "id": "s5_f3", "type": "rating", "label": "No unnecessary interactions impacting driving focus", "required": True },
            { "id": "s5_f4", "type": "rating", "label": "Full concentration maintained on road", "required": True },

            { "type": "heading", "label": "Fatigue Management & Break Discipline" },
            { "id": "s5_fm1", "type": "rating", "label": "Adequate rest breaks taken during journey", "required": True },
            { "id": "s5_fm2", "type": "rating", "label": "Captain rotation followed for long-distance travel", "required": True },
            { "id": "s5_fm3", "type": "rating", "label": "Captain did not appear tired while driving", "required": True },

            { "type": "heading", "label": "Mechanical Condition & Vehicle Health" },
            { "id": "s5_m1", "type": "rating", "label": "No unusual vibrations felt during travel", "required": True },
            { "id": "s5_m2", "type": "rating", "label": "No abnormal engine noise observed", "required": True },
            { "id": "s5_m3", "type": "rating", "label": "No smoke or burning smell from vehicle", "required": True },
            { "id": "s5_m4", "type": "rating", "label": "Vehicle performance stable throughout journey", "required": True },
            { "id": "s5_m5", "type": "rating", "label": "No signs of breakdown or technical faults", "required": True },

            { "type": "heading", "label": "Ride Safety Impact on Passengers" },
            { "id": "s5_si1", "type": "rating", "label": "Ride felt safe and physically comfortable", "required": True },
            { "id": "s5_si2", "type": "rating", "label": "No sudden unsafe movements affecting passengers", "required": True },
            { "id": "s5_si3", "type": "rating", "label": "Passengers remained stable while seated", "required": True },
            { "id": "s5_si4", "type": "rating", "label": "Driving did not create fear or anxiety", "required": True },

            { "type": "heading", "label": "Safety Equipment Availability (Visibility Check)" },
            { "id": "s5_sv1", "type": "rating", "label": "Fire extinguisher clearly visible inside bus", "required": True },
            { "id": "s5_sv2", "type": "rating", "label": "First aid kit available and accessible", "required": True },
            { "id": "s5_sv3", "type": "rating", "label": "Emergency hammer available near passenger seats", "required": True },
            { "id": "s5_sv4", "type": "rating", "label": "Emergency exits clearly marked and labeled", "required": True },
            { "id": "s5_sv5", "type": "rating", "label": "Safety instructions displayed inside bus", "required": True },

            { "type": "heading", "label": "Safety Equipment Condition (Usability Check)" },
            { "id": "s5_sc2", "type": "rating", "label": "First aid kit properly stocked with essentials", "required": True },
            { "id": "s5_sc3", "type": "rating", "label": "Emergency hammer in usable working condition", "required": True },
            { "id": "s5_sc4", "type": "rating", "label": "Safety equipment not damaged or missing", "required": True },

            { "type": "heading", "label": "Emergency Preparedness & Awareness" },
            { "id": "s5_ep1", "type": "rating", "label": "Emergency exits accessible without blockage", "required": True },
            { "id": "s5_ep2", "type": "rating", "label": "No confusion during safety-related situations", "required": True },

            { "type": "heading", "label": "Captain Fitness & Sobriety (Critical)" },
            { "id": "s5_cs1", "type": "rating", "label": "Captain driving showed no intoxication signs", "required": True },
            { "id": "s5_cs2", "type": "rating", "label": "No smell of alcohol from Captain", "required": True },
            { "id": "s5_cs3", "type": "rating", "label": "Captain behavior normal and well controlled", "required": True },
            { "id": "s5_cs4", "type": "rating", "label": "Speech clear when interacting with passengers", "required": True },
            { "id": "s5_cs5", "type": "rating", "label": "No signs of substance influence observed", "required": True },

            { "type": "heading", "label": "Co - Captain Fitness & Sobriety (Critical)" },
            { "id": "s5_ccs1", "type": "rating", "label": "Co - Captain driving showed no intoxication signs", "required": True },
            { "id": "s5_ccs2", "type": "rating", "label": "No smell of alcohol from Co-Captain", "required": True },
            { "id": "s5_ccs3", "type": "rating", "label": "Co - Captain behavior normal and well controlled", "required": True },
            { "id": "s5_ccs4", "type": "rating", "label": "Speech clear when interacting with passengers", "required": True },
            { "id": "s5_ccs5", "type": "rating", "label": "No signs of substance influence observed", "required": True },

            { "type": "heading", "label": "Role Change at Pit Stop (Critical Transition)" },
            { "id": "s5_rc1", "type": "rating", "label": "Driving responsibility clearly handed over at stop", "required": True },
            { "id": "s5_rc2", "type": "rating", "label": "New Captain appeared alert before taking control", "required": True },
            { "id": "s5_rc3", "type": "rating", "label": "No confusion during role transition process", "required": True },
            { "id": "s5_rc4", "type": "rating", "label": "Post-switch driving smooth and well controlled", "required": True },
            { "id": "s5_rc5", "type": "rating", "label": "No safety drop after role change", "required": True },

            { "type": "heading", "label": "Overall Safety Confidence Perception" },
            { "id": "s5_osc1", "type": "rating", "label": "Felt safe throughout the entire journey", "required": True },
            { "id": "s5_osc2", "type": "rating", "label": "Captain behavior inspired confidence and trust", "required": True },
            { "id": "s5_osc3", "type": "rating", "label": "Vehicle condition felt reliable and secure", "required": True },
            { "id": "s5_osc4", "type": "rating", "label": "No moment of serious safety concern", "required": True }
        ]
    },
    {
        "id": 6,
        "title": "Food & Pitstop Audit",
        "description": "Snack and pitstop break audit.",
        "timeEst": "5 min",
        "questions": [
            { "type": "heading", "label": "Food Service" },
            { "id": "s6_q1", "type": "rating", "label": "Food service aligned with journey duration", "required": True },
            { "id": "s6_q2", "type": "radio", "label": "Was food/snack service provided on this route (if applicable)?", "required": True, "options": ["Yes", "No"], "conditional": {"Yes": ["s6_q3", "s6_q4"]} },
            { "id": "s6_q3", "type": "rating", "label": "If provided, was the snack box properly sealed, fresh, and in good condition?", "required": True, "hidden": True },
            { "id": "s6_q4", "type": "rating", "label": "If provided, were the items hygienic and safe to consume?", "required": True, "hidden": True },

            { "type": "heading", "label": "Pitstop Management" },
            { "id": "s6_q5", "type": "rating", "label": "Was the scheduled pitstop made at a clean and suitable location for passengers?", "required": True },
            { "id": "s6_q6", "type": "rating", "label": "Restrooms clean and usable at the pitstop location", "required": True },
            { "id": "s6_q7", "type": "rating", "label": "Were drinking water, handwash, or basic hygiene facilities available?", "required": True },
            { "id": "s6_q8", "type": "rating", "label": "Was the pitstop location safe, well-lit, and comfortable?", "required": True },
            { "id": "s6_q9", "type": "rating", "label": "Was the halt duration sufficient without rush?", "required": True },
            { "id": "s6_q10", "type": "rating", "label": "Was the pitstop managed in an organized way with smooth reboarding?", "required": True }
        ]
    },
    {
        "id": 7,
        "title": "Announcements",
        "description": "Audit the quality and content of staff announcements.",
        "timeEst": "3 min",
        "questions": [
            { "type": "heading", "label": "Announcement Content" },
            { "id": "s7_q1", "type": "rating", "label": "Welcome announcement made clearly after boarding", "required": True },
            { "id": "s7_q2", "type": "rating", "label": "Safety instructions explained properly", "required": True },
            { "id": "s7_q3", "type": "rating", "label": "Important route updates or delay announcements shared when needed", "required": True },
            { "id": "s7_q4", "type": "rating", "label": "Mid-journey announcement made regarding next stop or progress", "required": True },
            { "id": "s7_q5", "type": "rating", "label": "Drop-off point announcements made before reaching stops", "required": True },
            
            { "type": "heading", "label": "Quality & Delivery" },
            { "id": "s7_q6", "type": "rating", "label": "Were announcements made clearly enough to be heard and understood?", "required": True },
            { "id": "s7_q7", "type": "rating", "label": "Were announcements made at the right time (not too early/late)?", "required": True },
            { "id": "s7_q8", "type": "rating", "label": "Was the tone of the staff polite and professional?", "required": True },
            { "id": "s7_q9", "type": "rating", "label": "Were announcements informative and relevant?", "required": True },
            { "id": "s7_q10", "type": "rating", "label": "Were passengers politely asked for ratings or feedback at appropriate time?", "required": True }
        ]
    },
    {
        "id": 8,
        "title": "Pilferage Check",
        "description": "Ensure financial integrity and ticket verification.",
        "timeEst": "5 min",
        "severity": "CRITICAL",
        "questions": [
            { "type": "heading", "label": "Ticket & Luggage Integrity" },
            { "id": "s8_q1", "type": "rating", "label": "No unauthorized passengers observed", "required": True },
            { "id": "s8_q2", "type": "rating", "label": "All luggage tagged properly", "required": True },
            
            { "type": "heading", "label": "Unauthorized Cash Handling" },
            { "id": "s8_q3", "type": "radio", "label": "Did any staff ask for cash payment without providing an official receipt?", "required": True, "options": ["Yes", "No"], "conditional": {"Yes": ["s8_amount", "s8_staff"]} },
            { "id": "s8_q4", "type": "radio", "label": "Did staff request extra money for seat allocation or luggage?", "required": True, "options": ["Yes", "No"] },
            { "id": "s8_q5", "type": "radio", "label": "Did staff ask passengers to pay outside the official booking system?", "required": True, "options": ["Yes", "No"] },
            { "id": "s8_q6", "type": "radio", "label": "Did staff collect cash for a service normally included in the fare?", "required": True, "options": ["Yes", "No"] },
            { "id": "s8_q7", "type": "radio", "label": "Was any cash collected without clearly explaining the reason?", "required": True, "options": ["Yes", "No"] },
            { "id": "s8_q8", "type": "radio", "label": "Did you observe staff accepting cash from passengers discreetly?", "required": True, "options": ["Yes", "No"] },
            { "id": "s8_q9", "type": "radio", "label": "Did any passenger appear boarded after paying cash directly?", "required": True, "options": ["Yes", "No"] },
            { "id": "s8_q10", "type": "radio", "label": "Was there any sign of unethical cash handling by staff?", "required": True, "options": ["Yes", "No"] },
            
            { "id": "s8_amount", "type": "text", "label": "Amount (approx)", "required": True, "hidden": True, "placeholder": "e.g. 500 Rs" },
            { "id": "s8_staff", "type": "select", "label": "Staff Involved", "required": True, "hidden": True, "options": ["Co-Captain", "Captain", "Sales Person"] }
        ]
    },
    {
        "id": 9,
        "title": "Delay Adherence",
        "description": "Analyze journey punctuality.",
        "timeEst": "3 min",
        "questions": [
            { "type": "heading", "label": "Punctuality Check" },
            { "id": "s9_q1", "type": "rating", "label": "Journey started on time from departure point", "required": True },
            { "id": "s9_q2", "type": "rating", "label": "Overall delay (if any) was justified and managed", "required": True },
            { "id": "s9_q3", "type": "rating", "label": "Did the bus arrive at final destination within expected window?", "required": True },
            { "id": "s9_q4", "type": "rating", "label": "Was total journey delay more than 15 minutes?", "required": True },
            
            { "type": "heading", "label": "Communication & Management" },
            { "id": "s9_q5", "type": "rating", "label": "Reason for delay clearly communicated to passengers", "required": True },
            { "id": "s9_q6", "type": "rating", "label": "Updates shared regularly when delay continued", "required": True },
            { "id": "s9_q7", "type": "rating", "label": "Was delay caused by operational issues in control of staff?", "required": True },
            { "id": "s9_q8", "type": "rating", "label": "Did unnecessary long halts or stoppages contribute to delay?", "required": True },
            { "id": "s9_q9", "type": "rating", "label": "Despite delays, did staff manage situation professionally?", "required": True },
            { "id": "s9_q10", "type": "rating", "label": "Overall trip schedule managed efficiently?", "required": True },
            { "id": "s9_total_delay", "type": "select", "label": "Total delay observed (minutes)", "required": True, "options": [str(i) for i in range(10, 310, 10)] }
        ]
    },
    {
        "id": 10,
        "title": "Safety & Security",
        "description": "Emergency preparedness and passenger safety.",
        "timeEst": "4 min",
        "severity": "CRITICAL",
        "questions": [
            { "type": "heading", "label": "Emergency Preparedness" },
            { "id": "s10_q1", "type": "rating", "label": "Emergency exits accessible and clearly marked", "required": True },
            { "id": "s10_q2", "type": "rating", "label": "CCTV monitoring signs visible and cameras present", "required": True },
            { "id": "s10_q3", "type": "checkbox", "label": "Were emergency exits/CCTV systems present and reassuring?", "required": True, "options": ["CCTV visible", "Emergency exits marked", "Staff alert and monitoring", "Night halt at safe locations", "None noticed"] },

            { "type": "heading", "label": "Passenger Safety" },
            { "id": "s10_q4", "type": "rating", "label": "Did you feel safe and secure throughout the journey?", "required": True },
            { "id": "s10_q5", "type": "rating", "label": "Were all passengers onboarded with proper ID verification?", "required": True },
            { "id": "s10_q6", "type": "rating", "label": "Did you observe any suspicious person or unauthorized passenger?", "required": True },
            { "id": "s10_q7", "type": "rating", "label": "No harassment or uncomfortable conduct toward any passenger", "required": True },
            { "id": "s10_q8", "type": "rating", "label": "No aggressive behavior or fights between passengers", "required": True },
            { "id": "s10_q9", "type": "checkbox", "label": "Any safety/security issues observed? (Select all)", "required": True, "options": [
                "Harassment / inappropriate behaviour", "Argument/fight between passengers", "Unsafe passenger behaviour", 
                "Theft suspicion / missing belongings", "Staff using mobile while driving", "Staff using earphones while driving", 
                "Staff appearing drunk/intoxicated", "Staff appearing sleepy/fatigued", "Passenger onboarded in drunken state",
                "Unauthorized / suspicious passenger", "Bus stopped at undisclosed location", "Passenger smoking/alcohol",
                "Blocking aisle / emergency exit", "Verbal abuse or threatening", "No issues observed"
            ]},
            { "id": "s10_q10", "type": "rating", "label": "Did female passengers/solo travelers appear comfortable?", "required": True },
            { "id": "s10_q11", "type": "rating", "label": "If issues occurred, did staff respond quickly and appropriately?", "required": True }
        ]
    },
    {
        "id": 11,
        "title": "Drop Responsibilities",
        "description": "Evaluate deboarding efficiency and closing interaction.",
        "timeEst": "3 min",
        "questions": [
            { "type": "heading", "label": "Drop Timing" },
            { "id": "s11_d1", "type": "rating", "label": "Drop point reached as per schedule", "required": True },
            
            { "type": "heading", "label": "Drop-off Execution" },
            { "id": "s11_d2", "type": "rating", "label": "Arrival communicated in advance to passengers", "required": True },
            { "id": "s11_d3", "type": "rating", "label": "Exit managed safely without rush or confusion", "required": True },
            { "id": "s11_d4", "type": "rating", "label": "Luggage returned correctly without delays or mix-ups", "required": True },
            
            { "type": "heading", "label": "Closing Interaction" },
            { "id": "s11_d5", "type": "rating", "label": "Passengers thanked with polite and respectful farewell", "required": True },
            { "id": "s11_d6", "type": "rating", "label": "Final queries handled before journey closure", "required": True },
            { "id": "s11_d7", "type": "rating", "label": "Smooth and positive end to journey", "required": True }
        ]
    },
    {
        "id": 12,
        "title": "Passenger Feedbacks",
        "description": "Capture direct feedback from other travelers.",
        "timeEst": "5 min",
        "questions": [
            { "id": "feedback_recorded", "type": "radio", "label": "Did you record detailed feedback from other passengers?", "required": True, "options": ["Yes", "No"] }
        ]
    },
    {
        "id": 13,
        "title": "Final Observations",
        "description": "Overall journey summary and final remarks.",
        "timeEst": "3 min",
        "questions": [
            { "type": "heading", "label": "Brand Experience" },
            { "id": "s13_staff_initiative", "type": "textarea", "label": "Did any staff member show exemplary hospitality while helping passengers? (Provide a shout-out: Mention names if known, otherwise refer to them as Captain, Co-captain, or by their specific role) *", "required": True },
            { "id": "s13_premium_moment", "type": "textarea", "label": "Was there any moment where FreshBus brand experience felt premium? *", "required": True },
            
            { "type": "heading", "label": "Conclusion" },
            { "id": "s13_positive_final", "type": "textarea", "label": "Any other final positive observation from the complete audit journey? *", "required": True },
            { "id": "s13_negative_final", "type": "textarea", "label": "Any other final negative observation from the complete audit journey? *", "required": True }
        ]
    }
]

# Process and add standard feedback fields to Sections 2-12
for section in SECTIONS_CONFIG:
    if section["id"] == 1 or section["id"] == 13: continue 
    
    sec_id = section["id"]
    for q in section["questions"]:
        if q["type"] == "rating" and "descriptionTrigger" not in q:
            q["descriptionTrigger"] = [1, 2, 5]
            q["descriptionLabel"] = "Audit Observation Details (Mandatory for 1, 2, or 5 stars):"

    section["questions"].append({ "type": "heading", "label": "Detailed Section Feedback" })
    section["questions"].append({
        "id": f"s{sec_id}_good",
        "type": "textarea",
        "label": f"\u2728 Share your positive highlights for {section['title']}",
        "required": True
    })
    section["questions"].append({
        "id": f"s{sec_id}_wrong",
        "type": "textarea",
        "label": f"\u26a0\ufe0f Mention any gaps or areas for improvement in {section['title']}",
        "required": True
    })
    section["questions"].append({
        "id": f"s{sec_id}_media",
        "type": "file",
        "label": f"\ud83d\udcf7 Section Media (Photos/Videos/Audio)",
        "required": True
    })

final_json = json.dumps(SECTIONS_CONFIG, indent=4)
final_json = final_json.replace('"REGEX_PNR"', '/^\\d{7}$/')

# Update script.js
with open('/Users/ash/Flying Audit Form/script.js', 'r', encoding='utf-8') as f:
    orig_content = f.read()

parts = orig_content.split('class FreshBusAudit')
if len(parts) == 2:
    header = """/**
 * Fresh Bus Mystery Ride Audit - Core Logic
 */

const CONFIG = {
    // IMPORTANT: Replace this with your Google Apps Script Web App URL after deployment
    GAS_URL: 'https://script.google.com/macros/s/AKfycbyC09_K7V7q9-u8X-V-pQjE1GZ_D-n_T_S_E/exec'
};

"""
    new_script = header + "const SECTIONS_CONFIG = " + final_json + ";\n\nclass FreshBusAudit" + parts[1]
    with open('/Users/ash/Flying Audit Form/script.js', 'w', encoding='utf-8') as f:
        f.write(new_script)
    print("SUCCESS: script.js updated with ALL 13 sections restored and bifurcated.")
else:
    print("FAILED: Could not find FreshBusAudit class in script.js")
