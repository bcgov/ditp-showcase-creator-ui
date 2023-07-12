const TEST_JSON = {
  character: {
    name: "Bob",
    role: "Lawyer",
    headshot_image: "/public/student/student.svg",
    body_image: "/public/student/student.svg",
  },
  title: "Meet Bob",
  text: "Meet Bob (that's you in this demo!). Bob is a student at Test College. To help make student life easier, BestBC College is going to offer Alice a digital Student Card to put in her BC Wallet.",
  revocationInfo: [
    {
      credentialName: "Test Card",
      credentialIcon: "/public/student/icon-student.svg",
      title: "Revoke your Test card",
      description:
        "Test College allows you to revoke your Student Card if:\n• there is a problem with your credential.\n• your device was lost or stolen and you want to secure your personal information.",
    },
  ],
  credentials: {
    test_card_id: {
      issuer_name: "Test College",
      name: "test_card",
      version: "1.10",
      icon: "/public/student/icon-student.svg",
      attributes: [
        {
          name: "student_first_name",
          value: "Bob",
          type: "string",
        },
        {
          name: "student_last_name",
          value: "Smith",
        },
        {
          name: "expiry_date",
          value: "20270517",
          type: "dateint",
        },
      ],
    },
    test_card_id1: {
      issuer_name: "Test College",
      name: "test_card",
      version: "1.10",
      icon: "/public/student/icon-student.svg",
      attributes: [
        {
          name: "student_first_name",
          value: "Bob",
          type: "string",
        },
        {
          name: "student_last_name",
          value: "Smith",
        },
        {
          name: "expiry_date",
          value: "20270517",
          type: "dateint",
        },
      ],
    },
  },
  onboarding: [],
  scenarios: [
    {
      id: "testClothesOnline",
      name: "Cool Clothes Online",
      overview: {
        title: "Getting a student discount",
        text: "Bob (that's you in this demo!) can get a student discount on her online purchase. In this example, you will just tell Cool Clothes Online you're a student.",
        image: "/public/student/useCases/store/card-school.svg",
      },
      summary: {
        title: "You're done!",
        text: "You proved that you're a student, and Cool Clothes Online gave you the discount. It only took a few seconds, you revealed minimal information, and Cool Clothes Online could easily and automatically trust what you sent.",
        image: "/public/student/student-accepted.svg",
      },
      steps: [
        {
          type: "CONNET_AND_VERIFY",
          title: "Confirm the information to send",
          text: "BC Wallet will now ask you to confirm what to send. Notice how it will only share if the credential has expired, not even the expiry date itself gets shared. You don't have to share anything else for it to be trustable.",
          requestOptions: {
            type: "OOB",
            title: "Cool Clothes Online Request",
            text: "Cool Clothes Online would like some of your personal information.",
            requestedCredentials: [
              {
                icon: "/public/student/useCases/school/icon-university-card.png",
                name: "test_card_id",
                predicates: {
                  name: "expiry_date",
                  type: ">=",
                  value: 20230517,
                },
              },
            ],
          },
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
          image: "/public/student/useCases/school/card-school.svg",
        },
        {
          screenId: "CONNECTION",
          title: "Start booking the room",
          text: "Imagine you're on the room booking page for BestBC College, abd you've chosen a data and time. Now they just need to confirm a few details. Scan the QR code to continue.",
          image:
            "/public/student/useCases/school/best-bc-college-no-overlay.png",
          verifier: {
            name: "BestBC College",
            icon: "/public/student/useCases/school/logo-university.png",
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
                icon: "/public/student/useCases/school/icon-university-card.png",
                name: "test_card",
                properties: ["student_first_name"],
              },
            ],
          },
        },
        {
          screenId: "CONNECTION_2",
          title: "Start booking the room",
          text: "Imagine you're on the room booking page for BestBC College, abd you've chosen a data and time. Now they just need to confirm a few details. Scan the QR code to continue.",
          image:
            "/public/student/useCases/school/best-bc-college-no-overlay.png",
          verifier: {
            name: "BestBC College",
            icon: "/public/student/useCases/school/logo-university.png",
          },
        },
        {
          screenId: "PROOF_2",
          title: "Confirm the information to send 2",
          text: "BC Wallet will now ask you to confirm what to send. Notice how it will only share if the credential has expired, not even the expiry date itself gets shared. You don't have to share anything else for it to be trustable.",
          requestOptions: {
            title: "Cool Clothes Online Request",
            text: "Cool Clothes Online would like some of your personal information.",
            requestedCredentials: [
              {
                icon: "/public/student/useCases/school/icon-university-card.png",
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
      ],
    },
  ],
};

export { TEST_JSON };
