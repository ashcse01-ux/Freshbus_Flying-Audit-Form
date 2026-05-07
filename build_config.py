import json

# Fresh Bus Mystery Ride Audit Configuration - FULL 13 SECTIONS RESTORED & BIFURCATED
config = [
    {
        "id": 1,
        "title": "Passenger Details",
        "description": "Capture basic ticket information to identify the mystery ride service.",
        "timeEst": "1 min",
        "questions": [
            { "id": "pnr", "type": "text", "label": "PNR", "required": True, "prefix": "FRE", "placeholder": "e.g. 1234567", "validation": "REGEX_PNR", "validationMsg": "Required exactly 7 digits." },
            { "id": "service_route", "type": "select", "label": "Service Route", "required": True, "options": ["HYD - VIJ", "VIJ - HYD", "CHN - TIR", "TIR - CHN", "BLR - CHN", "CHN - BLR"] },
            { "id": "headcount", "type": "select", "label": "Number of total passengers (Last Boarding Point)", "required": True, "options": [str(i) for i in range(1, 101)] }
        ]
    },
    {
        "id": 2,
        "title": "Staff Behaviour & Professionalism",
        "description": "Evaluate how our captains and staff represent FreshBus during onboarding and transit.",
        "timeEst": "4 min",
        "questions": [
            { "id": "q2_1", "type": "rating", "label": "1. Did the staff greet passengers politely during boarding?", "required": True },
            { "id": "q2_2", "type": "rating", "label": "2. Did the staff clearly guide passengers to their correct seats?", "required": True },
            { "id": "q2_3", "type": "rating", "label": "3. Did the staff answer passenger questions clearly when asked?", "required": True },
            { "id": "q2_4", "type": "rating", "label": "4. Did the staff provide timely updates in case of delay or route changes?", "required": True },
            { "id": "q2_5", "type": "rating", "label": "5. Did the staff remain calm and polite while handling complaints or arguments?", "required": True },
            { "id": "q2_6", "type": "rating", "label": "6. Was the staff available when passengers needed help during the journey?", "required": True },
            { "id": "q2_7", "type": "rating", "label": "7. Did the staff assist elderly, families with children, or differently-abled passengers?", "required": True },
            { "id": "q2_9", "type": "rating", "label": "8. Was the staff neatly dressed, groomed, and presentable on duty?", "required": True },
            { "id": "q2_10", "type": "rating", "label": "9. Did the staff avoid rude behaviour, shouting, or unnecessary arguments?", "required": True }
        ]
    },
    {
        "id": 3,
        "title": "Pickup Responsibilities",
        "description": "Evaluate boarding efficiency and punctuality.",
        "timeEst": "3 min",
        "questions": [
            { "id": "q3_1", "type": "rating", "label": "1. Was your ticket or booking verified properly before boarding?", "required": True },
            { "id": "q3_2", "type": "rating", "label": "2. Did the bus arrive at the exact scheduled pickup point?", "required": True },
            { "id": "q3_3", "type": "rating", "label": "3. Was the pickup location easy to identify and reachable?", "required": True },
            { "id": "q3_4", "type": "rating", "label": "4. Did the bus arrive at the pickup point on time?", "required": True },
            { "id": "q3_5", "type": "rating", "label": "5. Was boarding managed smoothly without confusion?", "required": True },
            { "id": "q3_6", "type": "rating", "label": "6. Were luggage loading handled carefully and securely?", "required": True }
        ]
    },
    {
        "id": 4,
        "title": "Bus Cleanliness & Maintenance",
        "description": "Audit the physical state of the bus.",
        "timeEst": "5 min",
        "questions": [
            { "id": "q4_1", "type": "rating", "label": "1. Was your seat clean and free from dust or stains?", "required": True },
            { "id": "q4_2", "type": "rating", "label": "2. Were the floor, aisle, and common areas clean?", "required": True },
            { "id": "q4_3", "type": "rating", "label": "3. Was the washroom clean and usable?", "required": True },
            { "id": "q4_4", "type": "rating", "label": "4. Was the air conditioning working properly throughout?", "required": True },
            { "id": "q4_5", "type": "rating", "label": "5. Were windows, curtains, and tray tables clean?", "required": True },
            { "id": "q4_6", "type": "rating", "label": "6. Was the bus free from bad odour or smoke smell?", "required": True },
            { "id": "q4_7", "type": "rating", "label": "7. Were charging points and reading lights working?", "required": True },
            { "id": "q4_8", "type": "rating", "label": "8. Were blankets and comfort items clean and provided?", "required": True },
            { "id": "q4_9", "type": "rating", "label": "9. Were the doors clean? Were they greasy?", "required": True },
            { "id": "q4_10", "type": "rating", "label": "10. Was the sun roof of the bus clean or greasy?", "required": True },
            { "id": "q4_11", "type": "rating", "label": "11. Was the fire extinguisher lock intact or broken?", "required": True },
            { "id": "q4_12", "type": "rating", "label": "12. Was the emergency hammer thread lock intact or broken?", "required": True }
        ]
    },
    {
        "id": 5,
        "title": "Driving & Technical Safety",
        "description": "Road discipline, Captain & Co-Captain behavior, vehicle health, and safety compliance.",
        "timeEst": "5 min",
        "severity": "CRITICAL",
        "questions": [
            { "id": "q5_1", "type": "rating", "label": "1. Did the bus maintain a safe speed within 80 km/h limit?", "required": True },
            { "id": "q5_2", "type": "rating", "label": "2. Did you observe rash driving, sudden braking, or unsafe overtaking?", "required": True },
            { "id": "q5_3", "type": "rating", "label": "3. Did the driver follow lane discipline and road rules?", "required": True },
            { "id": "q5_4", "type": "rating", "label": "4. Was unnecessary honking avoided during the trip?", "required": True },
            { "id": "q5_5", "type": "rating", "label": "5. During night travel, did the driver maintain controlled speed and alertness?", "required": True },
            { "id": "q5_6", "type": "rating", "label": "6. Did the bus feel mechanically stable without unusual vibrations?", "required": True },
            { "id": "q5_7", "type": "rating", "label": "7. Were key safety items visibly available and usable?", "required": True },
            { "id": "q5_8", "type": "rating", "label": "8. Did the driver avoid using a mobile phone while driving?", "required": True },
            { "id": "q5_9", "type": "rating", "label": "9. Did you feel safe based on the driver\u2019s behaviour?", "required": True },
            { "id": "q5_10", "type": "checkbox", "label": "10. Safety measurements observed:", "required": True, "options": ["Fire Extinguisher", "First Aid Kit", "Emergency Hammer", "Labeled Exits", "None of the above"] }
        ]
    },
    {
        "id": 6,
        "title": "Food & Pitstop Audit",
        "description": "Snack and pitstop break audit.",
        "timeEst": "5 min",
        "questions": [
            { "id": "q6_1", "type": "radio", "label": "1. Was food/snack service provided on this route?", "required": True, "options": ["Yes", "No"], "conditional": {"Yes": ["q6_2", "q6_3"]} },
            { "id": "q6_2", "type": "rating", "label": "2. If food was provided, was it fresh and in good condition?", "required": True, "hidden": True },
            { "id": "q6_3", "type": "rating", "label": "3. If food was provided, were the items hygienic?", "required": True, "hidden": True },
            { "id": "q6_4", "type": "rating", "label": "4. Was the scheduled pitstop made at a clean location?", "required": True },
            { "id": "q6_5", "type": "rating", "label": "5. Were restroom facilities at the pitstop clean?", "required": True },
            { "id": "q6_6", "type": "rating", "label": "6. Were drinking water or handwash facilities available?", "required": True },
            { "id": "q6_7", "type": "rating", "label": "7. Was the pitstop location safe and well-lit?", "required": True },
            { "id": "q6_8", "type": "rating", "label": "8. Was the halt duration sufficient?", "required": True },
            { "id": "q6_9", "type": "rating", "label": "9. Was the pitstop managed in an organized way?", "required": True }
        ]
    },
    {
        "id": 7,
        "title": "Co-Captain or Captain Announcements",
        "description": "Evaluate the frequency and quality of announcements made by the staff during the journey.",
        "timeEst": "3 min",
        "questions": [
            { "id": "q7_1", "type": "rating", "label": "1. Was a welcome announcement made after boarding?", "required": True },
            { "id": "q7_2", "type": "rating", "label": "2. Were important route updates or delay announcements shared?", "required": True },
            { "id": "q7_3", "type": "rating", "label": "3. Was a mid-journey announcement made regarding next stop?", "required": True },
            { "id": "q7_4", "type": "rating", "label": "4. Were drop-off point announcements made before stops?", "required": True },
            { "id": "q7_5", "type": "rating", "label": "5. Were announcements made clearly enough to be heard?", "required": True },
            { "id": "q7_6", "type": "rating", "label": "6. Was the tone of the staff polite and professional?", "required": True },
            { "id": "q7_7", "type": "rating", "label": "7. Were announcements informative and relevant?", "required": True },
            { "id": "q7_8", "type": "rating", "label": "8. Were passengers politely asked for ratings or feedback?", "required": True }
        ]
    },
    {
        "id": 8,
        "title": "Pilferage - Unauthorized Cash",
        "description": "A critical check for any out-of-system cash collections or unethical behavior by the staff.",
        "timeEst": "5 min",
        "severity": "CRITICAL",
        "questions": [
            { "id": "q8_1", "type": "radio", "label": "1. Did any staff ask for cash payment without receipt?", "required": True, "options": ["Yes", "No"], "conditional": {"Yes": ["q8_amount", "q8_staff"]} },
            { "id": "q8_2", "type": "radio", "label": "2. Did staff request extra money for seat or luggage?", "required": True, "options": ["Yes", "No"] },
            { "id": "q8_3", "type": "radio", "label": "3. Did staff ask to pay outside the official app system?", "required": True, "options": ["Yes", "No"] },
            { "id": "q8_4", "type": "radio", "label": "4. Did staff collect cash for a service normally included in fare?", "required": True, "options": ["Yes", "No"] },
            { "id": "q8_5", "type": "radio", "label": "5. Did any passenger appear to be boarded after paying cash directly?", "required": True, "options": ["Yes", "No"] },
            { "id": "q8_6", "type": "radio", "label": "6. Was there any sign of unethical cash handling?", "required": True, "options": ["Yes", "No"] },
            { "id": "q8_amount", "type": "text", "label": "Amount (approx)", "required": True, "hidden": True, "placeholder": "e.g. 500 Rs" },
            { "id": "q8_staff", "type": "select", "label": "Staff Involved", "required": True, "hidden": True, "options": ["Co-Captain", "Captain", "Sales Person"] }
        ]
    },
    {
        "id": 9,
        "title": "Delay Adherence",
        "description": "Assess the punctuality of the service and the reasons behind any observed delays.",
        "timeEst": "3 min",
        "questions": [
            { "id": "q9_1", "type": "rating", "label": "1. Did the bus depart from the pickup point on time?", "required": True },
            { "id": "q9_2", "type": "rating", "label": "2. Did the bus arrive at final destination within expected window?", "required": True },
            { "id": "q9_3", "type": "rating", "label": "3. Was the total journey delay more than 15 minutes?", "required": True },
            { "id": "q9_4", "type": "rating", "label": "4. If delayed, was the reason clearly communicated?", "required": True },
            { "id": "q9_5", "type": "rating", "label": "5. Were updates shared regularly when delay continued?", "required": True },
            { "id": "q9_6", "type": "rating", "label": "6. Was delay caused by operational issues in control?", "required": True },
            { "id": "q9_7", "type": "rating", "label": "7. Despite delays, did the staff manage professionally?", "required": True },
            { "id": "q9_total_delay", "type": "select", "label": "Total delay observed (minutes)", "required": True, "options": [str(i) for i in range(10, 310, 10)] }
        ]
    },
    {
        "id": 10,
        "title": "Passenger Safety & Security",
        "description": "Analyze the overall security of the journey, including staff alertness and passenger behavior.",
        "timeEst": "4 min",
        "severity": "CRITICAL",
        "questions": [
            { "id": "q10_1", "type": "rating", "label": "1. Did you feel safe and secure throughout the journey?", "required": True },
            { "id": "q10_2", "type": "rating", "label": "2. Were all passengers onboarded with proper identity verification?", "required": True },
            { "id": "q10_3", "type": "rating", "label": "3. Did you observe any suspicious person or unauthorized passenger?", "required": True },
            { "id": "q10_4", "type": "rating", "label": "4. Did you observe any harassment or misbehavior?", "required": True },
            { "id": "q10_5", "type": "checkbox", "label": "5. Any safety/security issues observed?", "required": True, "options": ["Harassment", "Argument", "Unsafe behaviour", "Theft suspicion", "Staff using mobile", "None"] },
            { "id": "q10_6", "type": "rating", "label": "6. Were luggage and belongings stored securely?", "required": True },
            { "id": "q10_7", "type": "checkbox", "label": "7. Were emergency exits/CCTV systems present?", "required": True, "options": ["CCTV visible", "Emergency exits marked", "Staff alert", "None"] },
            { "id": "q10_8", "type": "rating", "label": "8. Did female passengers/solo travelers appear comfortable?", "required": True }
        ]
    },
    {
        "id": 11,
        "title": "Drop Responsibilities",
        "description": "Evaluate deboarding efficiency and closing interaction.",
        "timeEst": "3 min",
        "questions": [
            { "id": "q11_1", "type": "rating", "label": "1. Did the bus stop at the promised drop-off point?", "required": True },
            { "id": "q11_2", "type": "rating", "label": "2. Was the drop-off process smooth and safe?", "required": True },
            { "id": "q11_3", "type": "rating", "label": "3. Were passengers informed in advance before reaching stops?", "required": True },
            { "id": "q11_4", "type": "rating", "label": "4. Were luggage unloading handled carefully?", "required": True },
            { "id": "q11_5", "type": "rating", "label": "5. Were passengers thanked with polite farewell?", "required": True },
            { "id": "q11_6", "type": "rating", "label": "6. Was the overall drop experience hassle-free?", "required": True }
        ]
    },
    {
        "id": 12,
        "title": "Passenger Feedbacks",
        "description": "Collect direct feedback from fellow passengers to understand broader customer satisfaction.",
        "timeEst": "5 min",
        "questions": [
            { "id": "q12_1", "type": "rating", "label": "1. Were passengers satisfied with their overall journey?", "required": True },
            { "id": "q12_2", "type": "rating", "label": "2. Did passengers report staff behavior was polite?", "required": True },
            { "id": "q12_3", "type": "rating", "label": "3. Did passengers mention bus was clean and comfortable?", "required": True },
            { "id": "q12_4", "type": "rating", "label": "4. Would passengers recommend this service?", "required": True },
            { "id": "feedback_recorded", "type": "radio", "label": "5. Do you want to record individual passenger feedback?", "required": True, "options": ["Yes", "No"] }
        ]
    },
    {
        "id": 13,
        "title": "Final Observations",
        "description": "Wrap up the audit with your final personal concluding thoughts on the entire journey.",
        "timeEst": "3 min",
        "questions": [
            { "id": "q13_1", "type": "textarea", "label": "1. What aspect of the journey was executed exceptionally well?", "required": True },
            { "id": "q13_2", "type": "textarea", "label": "2. Which part needs most improvement?", "required": True },
            { "id": "q13_3", "type": "checkbox", "label": "3. Most noticeable positive factor:", "required": True, "options": ["Punctuality", "Cleanliness", "Staff behaviour", "Safe driving", "Comfort", "Other"] },
            { "id": "q13_4", "type": "textarea", "label": "4. Any other final observation or suggestion?", "required": True }
        ]
    }
]

for section in config:
    sec_id = section["id"]
    section["questions"].append({
        "id": f"s{sec_id}_good",
        "type": "textarea",
        "label": f"\u2728 Share your positive highlights for {section['title']}",
        "required": True,
        "placeholder": "What did you like about this part of the journey?"
    })
    section["questions"].append({
        "id": f"s{sec_id}_wrong",
        "type": "textarea",
        "label": f"\u26a0\ufe0f Mention any gaps or areas for improvement in {section['title']}",
        "required": True,
        "placeholder": "Describe any issues or areas that could be better..."
    })
    section["questions"].append({
        "id": f"s{sec_id}_media",
        "type": "file",
        "label": f"\ud83d\udcf7 Section Media (Photos/Videos/Audio)",
        "required": True,
        "accept": "image/*,video/*,audio/*"
    })

final_json = json.dumps(config, indent=4)
final_json = final_json.replace('"REGEX_PNR"', '/^\\d{7}$/')

with open('/Users/ash/Flying Audit Form/script.js', 'r', encoding='utf-8') as f:
    orig = f.read()

parts = orig.split('class FreshBusAudit')
if len(parts) == 2:
    header = """/**
 * Fresh Bus Mystery Ride Audit - Core Logic
 */

const CONFIG = {
    // IMPORTANT: Replace this with your Google Apps Script Web App URL after deployment
    GAS_URL: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'
};

"""
    new_script = header + "const SECTIONS_CONFIG = " + final_json + ";\n\nclass FreshBusAudit" + parts[1]
    with open('/Users/ash/Flying Audit Form/script.js', 'w', encoding='utf-8') as f:
        f.write(new_script)
    print('SUCCESSFULLY SWAPPED CONFIG')
else:
    print('FAILED TO PARSE CLASS')
