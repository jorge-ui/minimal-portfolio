// prettier-ignore
const projectsData = [
  {
    id: 1,
    title: 'Crown Clothing',
    appLink: 'http://bit.ly/open-app-crown-clothing',
    repoLink: 'https://github.com/jrdeveloper71/clothing-ecommerce',
    icon: require('../../assets/projects/crown-clothing/icon.png'),
    summary: `
      My latest project so far, a well planned and well structured react app with redux.
      E-commerce 101, I was aiming for an easy-to-navigate UI and simplicity, so the user
      is happy with the experience. Things like the cart and the checkout page were designed
      with flawless navigation in mind, so taking the next action is straight-forward.
      I reinforced the react and redux workflow as well as communicating with the back-end
      and managing payments with stripe. Overall, quite a challenging task but lots of fun jaja.
    `,
    tools: [
      'React.js',
      'Redux',
      'React Spring',
      'Google Firebase',
      'Stripe'
    ],
    screenshots: {
      desktop: [
        require('../../assets/projects/crown-clothing/screenshots/desktop/desktop(0).png'),
        require('../../assets/projects/crown-clothing/screenshots/desktop/desktop(1).png'),
        require('../../assets/projects/crown-clothing/screenshots/desktop/desktop(2).png'),
        require('../../assets/projects/crown-clothing/screenshots/desktop/desktop(3).png'),
        require('../../assets/projects/crown-clothing/screenshots/desktop/desktop(4).png'),
      ],
      mobile: [
        require('../../assets/projects/crown-clothing/screenshots/mobile/mobile(0).png'),
        require('../../assets/projects/crown-clothing/screenshots/mobile/mobile(1).png'),
        require('../../assets/projects/crown-clothing/screenshots/mobile/mobile(2).png'),
        require('../../assets/projects/crown-clothing/screenshots/mobile/mobile(3).png'),
        require('../../assets/projects/crown-clothing/screenshots/mobile/mobile(4).png'),
      ]
    }
  },
  {
    id: 2,
    title: 'Space Image Visualizer',
    appLink: 'http://bit.ly/open-app-space-visualizer',
    repoLink: 'https://github.com/jrdeveloper71/space-visualizer',
    icon: require('../../assets/projects/space-image-visualizer/icon.png'),
    summary: `
      Many images to visualize them floating, that was the idea, so I grabbed the pixabay.com
      images API and I made a search bar. Upon submitting, the search term is used to fetch
      images from pixabay, and then, walla! Every image is rendered into the HTML canvas,
      with proper scaling and floating animations, of course, you know, space-like. I dug
      deep into the HTML canvas with this one, rendering the images properly was the challenge,
      I managed to do so.
    `,
    tools: [
      'React.js',
      'Vanilla Javascript',
      'HTML Canvas',
      'Pixabay Image API',
    ],
    screenshots: {
      desktop: [
        require('../../assets/projects/space-image-visualizer/screenshots/desktop/desktop(0).png'),
        require('../../assets/projects/space-image-visualizer/screenshots/desktop/desktop(1).png'),
        require('../../assets/projects/space-image-visualizer/screenshots/desktop/desktop(2).png'),
        require('../../assets/projects/space-image-visualizer/screenshots/desktop/desktop(3).png'),
      ],
      mobile: [
        require('../../assets/projects/space-image-visualizer/screenshots/mobile/mobile(0).png'),
        require('../../assets/projects/space-image-visualizer/screenshots/mobile/mobile(1).png'),
        require('../../assets/projects/space-image-visualizer/screenshots/mobile/mobile(2).png'),
        require('../../assets/projects/space-image-visualizer/screenshots/mobile/mobile(3).png'),
      ]
    }
  },
  {
    id: 3,
    title: 'Developer Connector',
    appLink: 'http://bit.ly/open-app-dev-connector',
    repoLink: 'https://github.com/jrdeveloper71/dev-connector',
    icon: require('../../assets/projects/dev-connector/icon.png'),
    summary: `
      By far the biggest project I’ve built on my own, Developer Connecto is built from the ground up,
      back-end to front-end. I spent the longest time on this project but I learned the most out of.
      I won’t go into the details in this short summary, but in sort, I used the MERN stack
      (MongoDB, Express.js, React.js, Node.js). Learning how to make the client and the server
      talk to each other was a lot of fun, watching all these moving parts all work together seamlessly,
      the beauty of code.
    `,
    tools: [
      'React.js',
      'Redux',
      'Cloudinary API',
      'Node.js',
      'MongoDB',
    ],
    screenshots: {
      desktop: [
        require('../../assets/projects/dev-connector/screenshots/desktop/desktop(0).png'),
        require('../../assets/projects/dev-connector/screenshots/desktop/desktop(1).png'),
        require('../../assets/projects/dev-connector/screenshots/desktop/desktop(2).png'),
        require('../../assets/projects/dev-connector/screenshots/desktop/desktop(3).png'),
        require('../../assets/projects/dev-connector/screenshots/desktop/desktop(4).png'),
        require('../../assets/projects/dev-connector/screenshots/desktop/desktop(5).png'),
        require('../../assets/projects/dev-connector/screenshots/desktop/desktop(6).png'),
      ],
      mobile: [
        require('../../assets/projects/dev-connector/screenshots/mobile/mobile(0).png'),
        require('../../assets/projects/dev-connector/screenshots/mobile/mobile(1).png'),
        require('../../assets/projects/dev-connector/screenshots/mobile/mobile(2).png'),
        require('../../assets/projects/dev-connector/screenshots/mobile/mobile(3).png'),
        require('../../assets/projects/dev-connector/screenshots/mobile/mobile(4).png'),
        require('../../assets/projects/dev-connector/screenshots/mobile/mobile(5).png'),
        require('../../assets/projects/dev-connector/screenshots/mobile/mobile(6).png'),
      ]
    }
  },
  {
    id: 4,
    title: 'Burger Builder',
    appLink: 'http://bit.ly/open-app-burger-builder',
    repoLink: 'https://github.com/jrdeveloper71/burger-builder',
    icon: require('../../assets/projects/burger-builder/icon.png'),
    summary: `
      A simple and straight-forward way of customizing a burger to your liking, with easy
      checkout, or at least that’s the goal with this app. Inspiration from a react
      course tutorial I took. I remade the app according to my vision of it.
      I focused on dynamically rendering the list of ingredients added by the user as
      the burger is being built. I struggled a bit trying to make the burger look nice,
      I think I managed to do so, I learned a lot about react rendering cycles.
    `,
    tools: [
      'React.js',
      'Node.js',
      'Stripe',
      'Sass'
    ],
    screenshots: {
      desktop: [
        require('../../assets/projects/burger-builder/screenshots/desktop/desktop(0).png'),
        require('../../assets/projects/burger-builder/screenshots/desktop/desktop(1).png'),
        require('../../assets/projects/burger-builder/screenshots/desktop/desktop(2).png'),
        require('../../assets/projects/burger-builder/screenshots/desktop/desktop(3).png'),
      ],
      mobile: [
        require('../../assets/projects/burger-builder/screenshots/mobile/mobile(0).png'),
        require('../../assets/projects/burger-builder/screenshots/mobile/mobile(1).png'),
        require('../../assets/projects/burger-builder/screenshots/mobile/mobile(2).png'),
        require('../../assets/projects/burger-builder/screenshots/mobile/mobile(3).png'),
      ]
    }
  },
  {
    id: 5,
    title: 'My Old Portfolio',
    appLink: 'http://bit.ly/open-app-old-portfolio',
    repoLink: 'https://github.com/jrdeveloper71/old-portfolio',
    icon: require('../../assets/projects/old-portfolio/icon.png'),
    summary: `
      My old portfolio was my first attempt at presenting my work, and then this new website
      right now is just a way better version of it. But back then, a live background at the
      landing screen was implemented using HTML Canvas, similar to the one this new website
      also has. Then, HTML elements reveal as you scroll, a feature I proudly added using
      vanilla javascript, yeah I know, no big deal, but I just enjoy figuring it out.
      It’s even more rewarding if I needed no extra resources.
    `,
    tools: [
      'React.js',
      'Vanilla Javascript',
      'Node.js',
      'Express.js',
    ],
    screenshots: {
      desktop: [
        require('../../assets/projects/old-portfolio/screenshots/desktop/desktop(0).png'),
        require('../../assets/projects/old-portfolio/screenshots/desktop/desktop(1).png'),
        require('../../assets/projects/old-portfolio/screenshots/desktop/desktop(2).png'),
        require('../../assets/projects/old-portfolio/screenshots/desktop/desktop(3).png'),
      ],
      mobile: [
        require('../../assets/projects/old-portfolio/screenshots/mobile/mobile(0).png'),
        require('../../assets/projects/old-portfolio/screenshots/mobile/mobile(1).png'),
        require('../../assets/projects/old-portfolio/screenshots/mobile/mobile(2).png'),
        require('../../assets/projects/old-portfolio/screenshots/mobile/mobile(3).png'),
        require('../../assets/projects/old-portfolio/screenshots/mobile/mobile(4).png'),
      ]
    }
  },
  {
    id: 6,
    title: 'The Great RGB Game',
    appLink: 'http://bit.ly/open-app-rgb-game',
    repoLink: 'https://github.com/jrdeveloper71/the-great-rgb',
    icon: require('../../assets/projects/the-great-rgb/icon.png'),
    summary: `
      One of my earliest projects, back in the days when I just started learning javascript,
      the game was built on jQuery and jQuery UI for the most part, and then Bootstrap
      for styling, this was quick and dirty, roughly speaking, but I learned important
      DOM manipulation techniques and event handling. Also, the game has sounds for a
      better UX, sounds which I crafted and implemented using vanilla javascript.
    `,
    tools: [
      'HTML & CSS',
      'jQuery',
      'Vanilla Javascript',
      'Bootstrap',
    ],
    screenshots: {
      desktop: [
        require('../../assets/projects/the-great-rgb/screenshots/desktop/desktop(0).png'),
        require('../../assets/projects/the-great-rgb/screenshots/desktop/desktop(1).png'),
        require('../../assets/projects/the-great-rgb/screenshots/desktop/desktop(2).png'),
        require('../../assets/projects/the-great-rgb/screenshots/desktop/desktop(3).png'),
      ],
      mobile: [
        require('../../assets/projects/the-great-rgb/screenshots/mobile/mobile(0).png'),
        require('../../assets/projects/the-great-rgb/screenshots/mobile/mobile(1).png'),
        require('../../assets/projects/the-great-rgb/screenshots/mobile/mobile(2).png'),
        require('../../assets/projects/the-great-rgb/screenshots/mobile/mobile(3).png'),
      ]
    }
  }
];

export default projectsData;
