from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    ingredients = data.get("ingredients", "").lower()
    age_group = data.get("ageGroup", "adult")

    risk_level = "Low"
    concerns = []

    if "sugar" in ingredients:
        if age_group == "child":
            risk_level = "High"
            concerns.append("High sugar intake can affect growth and dental health.")
        elif age_group == "adult":
            risk_level = "Moderate"
            concerns.append("Excess sugar may increase risk of diabetes.")
        elif age_group == "senior":
            risk_level = "High"
            concerns.append("Sugar spikes can impact heart health and insulin levels.")

    explanation = generate_reasoning(ingredients, age_group, risk_level)

    return jsonify({
        "summary": "Ingredient Safety Analysis",
        "age_group": age_group.capitalize(),
        "risk_level": risk_level,
        "key_concerns": concerns,
        "explanation": explanation,
        "uncertainty": "This analysis is indicative, not medical advice."
    })


def generate_reasoning(ingredients, age_group, risk):
    if age_group == "child":
        return (
            f"For children, ingredients like {ingredients} require caution. "
            "Developing bodies are more sensitive to sugar and additives. "
            f"Overall risk level is {risk}."
        )

    if age_group == "adult":
        return (
            f"For adults, {ingredients} is generally acceptable in moderation. "
            "However, long-term consumption may impact metabolic health. "
            f"Overall risk level is {risk}."
        )

    if age_group == "senior":
        return (
            f"For seniors, ingredients such as {ingredients} can have stronger effects. "
            "Blood sugar control and heart health must be considered. "
            f"Overall risk level is {risk}."
        )

    return "No sufficient data for reasoning."


if __name__ == "__main__":
    app.run(debug=True)
