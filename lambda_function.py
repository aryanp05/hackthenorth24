import requests
import json
import random

api_key = "VF.DM.66e50025aabf21e69cfe85fe.7p7hbjn53gMOwvsK"

def interact(user_id, request):
    print("THIS IS REQUEST: ", request)
    response = requests.post(
        f'https://general-runtime.voiceflow.com/state/user/{user_id}/interact',
        json={'request': request},
        headers={
            'Authorization': api_key,
            "versionID": 'production'
        },
    )
    print("THIS IS RESPONSE: ", response)
    # Return the response message to be used in Lambda's response
    messages = []
    for trace in response.json():
        if trace["type"] == "text":
            messages.append(trace["payload"]["message"])
    return messages

def lambda_handler(event, context):
    headers = event.get('headers', {})
    cart_header = headers.get('cart', None)
    print("THIS IS CART: ", cart_header)
    # Extract user input from the Lambda event
    #user_id = event.get('user_id', 'default_user')
    user_id = str(random.randint(1, 10000))
    user_input = event.get('input', '')

    # Determine interaction type and call interact function
    if user_input.lower() == 'launch':
        response_messages = interact(user_id, {"type": "launch", "payload": cart_header})
    else:
        response_messages = interact(user_id, {"type": "text", "payload": cart_header})
    
    
    # Prepare the Lambda response
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',  
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
        },
        'body': json.dumps({
            'messages': response_messages
        })
    }
    
    
    
