from fastapi import APIRouter
import random

router = APIRouter()

WORDS = [
    {
        "word_level": "Intermediate",
        "word": "Advertisement",
        "meaning": "a notice or announcement in a public medium promoting a product, service, or event or publicizing a job vacancy.",
        "example": "He learned about the job from an advertisement in the newspaper."
    },
    {
        "word_level": "Beginner",
        "word": "Purchase",
        "meaning": "to buy something.",
        "example": "She decided to purchase a new pair of shoes."
    },
    {
        "word_level": "Intermediate",
        "word": "Predict",
        "meaning": "to say what will happen in the future based on knowledge or experience.",
        "example": "Scientists can predict the weather with improving accuracy."
    },
    {
        "word_level": "Advanced",
        "word": "Inevitable",
        "meaning": "certain to happen and impossible to avoid.",
        "example": "Given the poor planning, failure seemed inevitable."
    },
    {
        "word_level": "Intermediate",
        "word": "Modify",
        "meaning": "to change something slightly, especially to improve it.",
        "example": "He modified his diet to include more vegetables."
    },
    {
        "word_level": "Beginner",
        "word": "Borrow",
        "meaning": "to take and use something belonging to someone else with the intention of returning it.",
        "example": "Can I borrow your pen for a moment?"
    },
    {
        "word_level": "Advanced",
        "word": "Consequently",
        "meaning": "as a result of something.",
        "example": "The company did not meet its goals; consequently, budgets were reduced."
    },
    {
        "word_level": "Intermediate",
        "word": "Maintain",
        "meaning": "to keep something in good condition or continue at the same level.",
        "example": "It's important to maintain a healthy lifestyle."
    },
    {
        "word_level": "Beginner",
        "word": "Describe",
        "meaning": "to explain what something or someone is like.",
        "example": "Can you describe the man you saw?"
    },
    {
        "word_level": "Advanced",
        "word": "Contradict",
        "meaning": "to say the opposite of what someone else has said, or deny the truth.",
        "example": "His actions contradict his previous promises."
    }
]

@router.get("/word")
async def get_random_word():
    return random.choice(WORDS)
