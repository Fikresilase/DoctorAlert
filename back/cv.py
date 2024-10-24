import cv2
from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)

@app.route('/api/analyze', methods=['POST'])
def analyze_patient_behavior():
    data = request.json
    room_no = data.get('room_no')
    behavior_data = data.get('behavior_data')  # Assume this contains relevant behavior info

    if not room_no or not behavior_data:
        return jsonify({'error': 'Room number and behavior data are required'}), 400

    # Analyze behavior and determine priority level
    try:
        priority_level = analyze_behavior(behavior_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    # Notify the doctor
    try:
        notify_doctor(room_no, priority_level)
    except Exception as e:
        return jsonify({'error': 'Failed to notify doctor: ' + str(e)}), 500

    return jsonify({
        'room_no': room_no,
        'priority_level': priority_level,
    })

def analyze_behavior(behavior_data):
    """
    Analyze the behavior data to determine the priority level.
    This is a placeholder for actual analysis logic.
    """
    if behavior_data.get('motion_detected', False):
        return 'High'
    elif behavior_data.get('unusual_activity', False):
        return 'Medium'
    return 'Low'

def notify_doctor(room_no, priority_level):
    """
    Notify the doctor via email about the patient's priority level.
    This function uses SMTP to send an email notification.
    """
    # Configure your SMTP server and email details
    smtp_server = 'smtp.example.com'
    smtp_port = 587
    sender_email = 'your_email@example.com'
    receiver_email = 'doctor_email@example.com'
    password = 'your_email_password'

    subject = f'Patient Alert: Room {room_no}'
    body = f'Priority Level: {priority_level}'

    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender_email
    msg['To'] = receiver_email

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, msg.as_string())

if __name__ == '__main__':
    app.run(debug=True)
