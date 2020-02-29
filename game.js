const textElement = document.getElementById("text")
const optionButtonElement = document.getElementById("option-buttons")

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text

    while (optionButtonElement.firstChild) {
        optionButtonElement.removeChild(optionButtonElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement("button")
            button.innerText = option.text
            button.classList.add("btn")
            button.addEventListener("click", () => selectOption(option))
            optionButtonElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: "You wake up in a strange room dark and cold, wondering where you could be, upon looking around the room you see a vile of blue liquid.",
        options: [
            {
                text: "Take the liquid?",
                setState: { blueLiquid: true },
                nextText: 2
            },
            {
                text: "Leave the liquid behind?",
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "You venture forth in search of answers to where you are when you come across a merchant.",
        options: [
            {
                text: "Would you like to trade the vile of blue liquid to eh merchant for an axe?",
                requiredState: (currentState) => currentState.blueLiquid,
                setState: { blueLiquid: false, axe: true },
                nextText: 3
            },
            {
                text: "Would you like to trade the vile of blue liquid to eh merchant for an shield?",
                requiredState: (currentState) => currentState.blueLiquid,
                setState: { blueLiquid: false, shield: true },
                nextText: 3
            },
            {
                text: "Ignore the merchant",
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: "After leaving the merchant you notice that the sun is beginning to set and the temperature outside is dropping fast, just off the horizon you notice what looks to be a small town next to a dangerouse looking compund.",
        options: [
            {
                text: "Explore the compound?",
                nextText: 4
            },
            {
                text: "Find a room to sleep at in town?",
                nextText: 5
            },
            {
                text: "Find some hay in a stable to sleep in?",
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: "You are so tired that you fall asleep while exploring the compund, in doing so you are captured by a band of muraders who steal all you supplies and force you to work for them.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: "Without any money to pay for a room in town you are swiftly thrown into jail for attempting to defraud a local merchant.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: "After a night of good sleep in the stables near the edge of town, you feel up to exploring the compound.",
        options: [
            {
                text: "Go explore the compound?",
                nextText: 7
            },
            {
                text: "Continue on your journey, without exploring the castle?",
                nextText: 8
            }
        ]
    },
    {
        id: 7,
        text: "While exploring the compound, you are confronted by a band of raiders who run this town, they confront you and demand that you give up all of your supplies and join them in robbing travelers who pass through the town.",
        options: [
            {
                text: "Try to run?",
                nextText: 9
            },
            {
                text: "Attack the group with your axe?",
                nextText: 10
            },
            {
                text: "Jump out of the second story window and take your chances?",
                nextText: 11
            }
        ]
    },
    {
        id: 8,
        text: "You continue on your journey without exploring the compound, on your way out of town you meet another traveler also on her way out of town, she asks if you would like to team up for strangth in numbers along the way.",
        options: [
            {
                text: "Join forces with your fellow traveler?",
                nextText: 12
            },
            {
                text: "ignore the fellow traveler and continue on your way?",
                nextText: 13
            }
        ]
    },
    {
        id: 9,
        text: "When you try to run, one of the raiders attacks you from behind.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 10,
        text: "You are horribly outnumbered and are quickly captured.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 11,
        text: "After jumping out the window you break your leg and are quickly captured.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 4,
        text: "You are so tired that you fall asleep while exploring the compund, in doing so you are captured by a band of muraders who steal all you supplies and force you to work for them.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 12,
        text: "It turns out that your fellow traveler has a wagon with horses, you both continue on your journey together and ride off into the sunset.",
        options: [
            {
                text: "You Win! You get by with a little help from your friends! Play Again?",
                nextText: -1
            }
        ]
    },
    {
        id: 13,
        text: "You tell the traveler no thank you, wish them well in their journey and continue on yours alone.",
        options: [
            {
                text: "You Lose! You get by with a little help from your friends! Play Again?",
                nextText: -1
            }
        ]
    }
]

startGame();