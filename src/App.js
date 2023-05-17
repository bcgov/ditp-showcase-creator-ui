import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useImmer } from 'use-immer' // useImmer is an alternative to useState; it is useful for dealing with nested JSON

function App() {

  const [showcaseJSON, setShowcaseJSON] = useImmer(
    {
      personas: [
        {
          "name": "",
          "type": "",
          "image": "",
          "progressBar": [
            {
              "name": "person",
              "screenId": "PICK_CHARACTER",
              "iconLight": "./icon-person-light.svg",
              "iconDark": "./icon-person-dark.svg"
            },
            {
              "name": "moon",
              "onboardingStep": "SETUP_START",
              "iconLight": "./moonLight.svg",
              "iconDark": "./svgmoonDark"
            },
            {
              "name": "wallet",
              "onboardingStep": "CONNECT",
              "iconLight": "./walletLight.svg",
              "iconDark": "./walletDark.svg"
            },
            {
              "name": "notification",
              "onboardingStep": "SETUP_COMPLETED",
              "iconLight": "./notificationLight.svg",
              "iconDark": "./notificationDark.svg"
            },
            {
              "name": "balloon",
              "onboardingStep": "DEMO_END",
              "iconLight": "./balloonLight.svg",
              "iconDark": "./balloonDark.svg"
            }
          ],
          "onboarding": [
            {
              "screenId": "PICK_CHARACTER",
              "title": "Pick a character",
              "text": ""
            },
            {
              "screenId": "SETUP_START",
              "title": "Let's get started!",
              "text": "BC Wallet is a new app for storing and using credentials on your smartphone. Credentials are things like IDs, licenses and diplomas. \nUsing your BC Wallet is fast and simple. In the future it can be used online and in person.You approve every use, and share only what is needed.",
              "image": ""
            },
            {
              "screenId": "ACCEPT",
              "title": "Accept your credential",
              "text": "Check your phone. You've received a credential offer in your BC Wallet. You can use this credential to prove information about yourself.",
              "image": "",
              "credentials": [
                {
                  "name": "Example Credential",
                  "issuer_name": "Issuer",
                  "icon": "",
                  "attributes": [
                    {
                      "name": "First Name",
                      "value": "Jane"
                    },
                    {
                      "name": "Last Name",
                      "value": "Doe"
                    },
                  ]
                }
              ]
            },
            {
              "screenId": "SETUP_COMPLETED",
              "title": "You're all set!",
              "text": "Congratulations, you've just received your first digital credentials. They are safely stored in your wallet and ready to be used. So, what are you waiting for? Let's go!",
              "image": ""
            }
          ],
          "useCases": [
            {
              "id": "courtServices",
              "screens": [
                {
                  "screenId": "START",
                  "title": "Prove your identity with the credential you recieved",
                  "text": "You can now use the credential that is in your B.C. Wallet app to verify your identity.",
                  "image": ""
                },
                {
                  "screenId": "CONNECTION",
                  "title": "Start proving you're you",
                  "text": "You're now ready to prove you're you. Scan the QR code.",
                  "image": ""
                },
                {
                  "screenId": "PROOF",
                  "title": "Confirm the information to send",
                  "text": "BC Wallet will now ask you to confirm what information to send.",
                  "requestOptions": {
                    "title": "Verifier Request",
                    "text": "The verifier would like some of your personal information.",
                    "requestedCredentials": [
                      {
                        "name": "Example Credential",
                        "properties": [
                          "First Name",
                          "Last Name",
                        ]
                      },
                    ]
                  }
                },
                {
                  "screenId": "STEP_END",
                  "title": "You're done!",
                  "text": "You've proved your identity using your credential. It only took a few seconds and you revealed minimal information that the verifier could easily and automatically trust.",
                  "image": ""
                }
              ]
            }
          ]
        }
      ]
    }
  );

  function saveJSON() {
    
  }

  function handleNameChange(e){
    setShowcaseJSON(
    setChanges => {
      setChanges.personas[0].name = e.target.value;
    })
  }



  return (
    <>
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <p className="text-3xl text-gray-700 font-bold mb-5">
          Welcome!
        </p>
        <p className="text-gray-500 text-lg">
          React and Tailwind CSS in action
        </p>

        <label>
        Persona 1 Name:
        <input
          value={showcaseJSON.personas[0].name}
          onChange={handleNameChange}
        />
      </label>
      <div>
      <button onClick={saveJSON} className="p-2 m-2 border shadow bg-white">
        Save JSON
      </button>
      </div>

      </div>
      <p>
        {JSON.stringify(showcaseJSON, null, "\t")}
      </p>
    </>
  );
}
export default App;
