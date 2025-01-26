from flask import Flask, request, jsonify
import pickle
import json
import pandas as pd
import numpy as np

app = Flask(__name__)

# Load the model
with open('../random_forest_model.pkl', 'rb') as file:
    loaded_model = pickle.load(file)

def calculate_features(data):
    # Initialize counters
    total_steps = 0
    move_hand_count = 0
    collect_coin_count = 0
    next_level_count = 0
    configuration_count = 0
    use_hint_count = 0
    change_timer_count = 0
    change_cell_count = 0
    rate_level_count = 0
    collect_use_powerup_count = 0
    open_inventory_count = 0
    change_lives_count = 0
    visit_leaderboard_count = 0
    perform_undo_count = 0
    accept_gift_count = 0
    change_interface_count = 0
    reject_gift_count = 0
    open_rules_count = 0
    perform_reset_count = 0

    # Parse JSON data
    events = json.loads(data)

    # Count events
    for event in events:
        total_steps += 1

        if event['type'] == 'gameplay' and event['action'] == 'move hand':
            move_hand_count += 1
        elif event['type'] == 'gameplay' and event['action'] == 'collect coin':
            collect_coin_count += 1
        elif event['type'] == 'gameplay' and event['action'] == 'next level':
            next_level_count += 1
        elif event['type'] == 'configuration':
            configuration_count += 1
        elif event['action'] == 'use hint':
            use_hint_count += 1
        elif event['type'] == 'configuration' and 'timer' in event:
            change_timer_count += 1
        elif event['action'] == 'change cell count':
            change_cell_count += 1
        elif event['action'] == 'rate level':
            rate_level_count += 1
        elif event['action'] in ['sell powerup', 'use powerup', 'collect powerup']:
            collect_use_powerup_count += 1
        elif event['action'] == 'open inventory':
            open_inventory_count += 1
        elif event['type'] == 'gameplay' and event['action'] == 'open rules':
            open_rules_count += 1
        elif event['type'] == 'configuration' and event['action'] == 'change color scheme':
            change_interface_count += 1
        elif event['type'] == 'configuration' and event['action'] == 'change lives count':
            change_lives_count += 1
        elif event['action'] in ['leaderboard', 'visit leaderboard']:
            visit_leaderboard_count += 1
        elif event['type'] == 'gameplay' and event['action'] == 'perform reset':
            perform_reset_count += 1
        elif event['type'] == 'gameplay' and event['action'] == 'perform undo':
            perform_undo_count += 1
        elif event['type'] == 'gameplay' and event['action'] == 'accept gift':
            accept_gift_count += 1
        elif event['type'] == 'gameplay' and event['action'] == 'reject gift':
            reject_gift_count += 1

    # Calculate average steps
    average_steps = total_steps / (next_level_count + 1) if next_level_count > 0 else total_steps

    # Create and return the feature dictionary
    features = {
        "Avarge step": average_steps,
        "How many Steps": total_steps,
        "move hand": move_hand_count,
        "collect coin": collect_coin_count,
        "next level": 2,
        "configration": configuration_count,
        "hint": use_hint_count,
        "change timer": change_timer_count,
        "change cell count": change_cell_count,
        "rate level": rate_level_count,
        "change levels COUNT": 0,
        "collect & use powerup": collect_use_powerup_count,
        "Open rules": open_rules_count,
        "open inventory": open_inventory_count,
        "change the interface look like(coloer,cell,clock shape)": change_interface_count,
        "change lives count": change_lives_count,
        "vist leaderboard": visit_leaderboard_count,
        "perform reset": perform_reset_count,
        "perforn undo": perform_undo_count,
        "accept gift": accept_gift_count,
        "reject gift": reject_gift_count
    }

    return features

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['session']
    
    # Calculate features
    result = calculate_features(data)
    
    # Convert the result dictionary to a pandas DataFrame
    df = pd.DataFrame.from_dict(result, orient='index', columns=['Value'])
    df = df.reset_index().rename(columns={'index': 'Feature'})

    # Extract only the numeric values from the second column
    X_new = np.array([float(row[1]) for row in df.values]).reshape(1, -1)

    # Make predictions
    new_predictions = loaded_model.predict(X_new)

    return jsonify({'prediction': new_predictions.tolist()})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
