const DEFAULT_JSON = {
  name: "Bob",
  type: "Test",
  headshot_image: "",
  body_image: "",
  description: "This is Bob's description.",
  credentials: {
    "test_card_id": {
      "issuer_name": "Test College",
      "name": "test_card",
      "version": "1.10",
      "icon": "",
      "attributes": [
        {
          "name": "student_first_name",
          "value": "Bob",
          "type": "string"
        },
        {
          "name": "student_last_name",
          "value": "Smith"
        },
        {
          "name": "expiry_date",
          "value": "20270517",
          "type": "dateint"
        }
      ]
    },
    "test_card_id_2": {
      "issuer_name": "My Workplace",
      "name": "test_card",
      "version": "1.10",
      "icon": "",
      "attributes": [
        {
          "name": "student_first_name",
          "value": "Bob",
          "type": "string"
        },
        {
          "name": "student_last_name",
          "value": "Smith"
        },
        {
          "name": "expiry_date",
          "value": "20270517",
          "type": "dateint"
        }
      ]
    }
  },
  revocationInfo: [
    {
      credentialName: "Test Card",
      credentialIcon: "",
      title: "Revoke your Test card",
      description:
        "Test College allows you to revoke your Student Card if:\n• there is a problem with your credential.\n• your device was lost or stolen and you want to secure your personal information.",
    },
  ],
  progressBar: [
    {
      name: "person",
      onboardingStep: "PICK_CHARACTER",
      iconLight: "",
      iconDark: "",
    },
    {
      name: "moon",
      onboardingStep: "SETUP_START",
      iconLight: "",
      iconDark: "",
    },
    {
      name: "wallet",
      onboardingStep: "CHOOSE_WALLET",
      iconLight: "",
      iconDark: "",
    },
    {
      name: "notification",
      onboardingStep: "ACCEPT_CREDENTIAL",
      iconLight: "",
      iconDark: "",
    },
    {
      name: "balloon",
      onboardingStep: "SETUP_COMPLETED",
      iconLight: "",
      iconDark: "",
    },
  ],
  onboarding: [
    {
      screenId: "PICK_CHARACTER",
      title: "Meet Bob",
      text: "Meet Bob (that's you in this demo!). Bob is a student at Test College. To help make student life easier, BestBC College is going to offer Alice a digital Student Card to put in her BC Wallet.",
    },
    {
      screenId: "SETUP_START",
      title: "Let's get started!",
      text: "BC Wallet is a new app for storing and using credentials on your smartphone. Credentials are things like IDs, licenses and diplomas. \nUsing your BC Wallet is fast and simple. In the future it can be used online and in person. You approve every use, and share only what is needed. \nIn this demo, you will use two credentials to prove who you are and access court materials online instead of in-person.",
      image: "",
    },
    {
      screenId: "CHOOSE_WALLET",
      title: "Install BC Wallet",
      text: "First, install the BC Wallet app onto your smartphone. Select the button below for instructions and the next step.",
      image: "",
    },
    {
      screenId: "CONNECT",
      title: "Connect with Test College",
      text: "Imagine, as Alice, you are logged into the BestBC College website (see below). They want to offer you a Digital Student Card. Use your BC Wallet to scan the QR code from the website.",
      image: "",
    },
    {
      screenId: "ACCEPT_CREDENTIAL",
      title: "Accept your test card",
      text: "Your wallet now has a secure and private connection with BestBC College. You should have received an offer in BC Wallet for a Student Card.\nReview what they are sending, and choose 'Accept offer'.",
      image: "",
      credentials: [
        "test_card_id",
      ],
    },
    {
      screenId: "SETUP_COMPLETED",
      title: "You're all set!",
      text: "Congratulations, you’ve just received your first digital credentials. They are safely stored in your wallet and ready to be used. So, what are you waiting for? Let’s go!",
      image: "",
    },
  ],
  useCases: [
    {
      id: "testClothesOnline",
      name: "Cool Clothes Online",
      screens: [
        {
          screenId: "START",
          title: "Getting a student discount",
          text: "Bob (that's you in this demo!) can get a student discount on her online purchase. In this example, you will just tell Cool Clothes Online you're a student.",
          image: "",
        },
        {
          screenId: "CONNECTION",
          title: "Start proving you're a student",
          text: "Imagine, as Alice, you are in the checkout process for Cool Clothes Online. They're offering you a 15% discount on your purchase if you can prove you're a student. First, scan the QR code.",
          image: "",
          verifier: {
            name: "Cool Clothes Online",
            icon: "",
          },
        },
        {
          screenId: "PROOF",
          title: "Confirm the information to send",
          text: "BC Wallet will now ask you to confirm what to send. Notice how it will only share if the credential has expired, not even the expiry date itself gets shared. You don't have to share anything else for it to be trustable.",
          requestOptions: {
            title: "Cool Clothes Online Request",
            text: "Cool Clothes Online would like some of your personal information.",
            requestedCredentials: [
              {
                icon: "",
                name: "test_card",
                predicates: {
                  name: "expiry_date",
                  type: ">=",
                  value: 20230517,
                },
              },
            ],
          },
        },
        {
          screenId: "STEP_END",
          title: "You're done!",
          text: "You proved that you're a student, and Cool Clothes Online gave you the discount. It only took a few seconds, you revealed minimal information, and Cool Clothes Online could easily and automatically trust what you sent.",
          image: "",
        },
      ],
    },
    {
      id: "studyTest",
      name: "Test College",
      screens: [
        {
          screenId: "START",
          title: "Book a study room",
          text: "Alice has lots of work to do, and needs a study room for some peace and quiet. In this example, we'll present some info from our Student Card, but just what's needed to book the room.",
          image: "",
        },
        {
          screenId: "CONNECTION",
          title: "Start booking the room",
          text: "Imagine you're on the room booking page for BestBC College, abd you've chosen a data and time. Now they just need to confirm a few details. Scan the QR code to continue.",
          image:
            "",
          verifier: {
            name: "BestBC College",
            icon: "",
          },
        },
        {
          screenId: "PROOF",
          title: "Confirm the information to send",
          text: "BC Wallet will now ask you to confirm what to send for the booking. Notice how they only need your first name so they can display it on the booking screen. By providing anything from your student card, they automatically know your student card hasn't been revoked.",
          requestOptions: {
            title: "BestBC College Request",
            text: "BestBC College would like some of your personal information.",
            requestedCredentials: [
              {
                icon: "",
                name: "test_card",
                properties: ["student_first_name"],
              },
            ],
          },
        },
        {
          screenId: "STEP_END",
          title: "You're done!",
          text: "The room is booked. Just by proving your first name, Best BC College could trust you are a current student, and could let others know there's a booking without revealing too much about you.",
          image: "",
        },
      ],
    },
  ],
};

export { DEFAULT_JSON };
