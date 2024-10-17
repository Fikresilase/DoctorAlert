# cv.py

import cv2
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/analyze', methods=['POST'])
def analyze_patient_behavior():
    data = request.json
    room_no = data.get('room_no')
    behavior_data = data.get('behavior_data')  # Assume this contains relevant behavior info

    if not room_no or not behavior_data:
        return jsonify({'error': 'Room number and behavior data are required'}), 400

    # Analyze behavior and determine priority level
    priority_level = analyze_behavior(behavior_data)

    # Notify the doctor (you can implement this as needed)
    notify_doctor(room_no, priority_level)

    return jsonify({
        'room_no': room_no,
        'priority_level': priority_level,
    })

def analyze_behavior(behavior_data):
    # Placeholder for actual analysis logic
    # Return priority level based on behavior
    if behavior_data['motion_detected']:
        return 'High'
    return 'Low'

def notify_doctor(room_no, priority_level):
    # Implement notification logic (e.g., send an email, push notification)
    print(f'Notify doctor: Room {room_no}, Priority Level: {priority_level}')

if __name__ == '__main__':
    app.run(debug=True)