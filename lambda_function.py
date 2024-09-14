import requests
import json

api_key = "VF.DM.66e5bf6e7e55f06b654edcf9.u7AhXOqoqBVPVcrM"

def interact(user_id, request):
    response = requests.post(
        f'https://general-runtime.voiceflow.com/state/user/{user_id}/interact',
        json={'request': request},
        headers={
            'Authorization': api_key,
            "versionID": 'production'
        },
    )
    # Return the response message to be used in Lambda's response
    messages = []
    for trace in response.json():
        if trace["type"] == "text":
            messages.append(trace["payload"]["message"])
    return messages

def lambda_handler(event, context):
    # Extract user input from the Lambda event
    user_id = event.get('user_id', 'default_user')
    user_input = event.get('input', '')

    # Determine interaction type and call interact function
    if user_input.lower() == 'launch':
        response_messages = interact(user_id, {"type": "launch"})
    else:
        response_messages = interact(user_id, {"type": "text", "payload": user_input})
    
    # Prepare the Lambda response
    return {
        'statusCode': 200,
        'body': json.dumps({
            'messages': response_messages
        })
    }
