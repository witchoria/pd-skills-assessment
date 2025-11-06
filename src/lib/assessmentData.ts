import { Competency } from '@/types/assessment';

export const COMPETENCIES: Competency[] = [
  {
    id: 'primary-research',
    name: 'Primary research',
    slug: 'primary-research',
    statements: [
      {
        id: 'pr-1',
        text: 'Understand the importance of user research and be an advocate for it, not just before the product is designed but also during design and after deployment.'
      },
      {
        id: 'pr-2',
        text: 'Understands a range of research methods and when to apply them, selecting the right participants, sample size, and recruitment strategies based on the problem and scope.'
      },
      {
        id: 'pr-3',
        text: 'Use AI as a copilot to draft research materials like interview guides or surveys, then apply AI-powered tools to organize and synthesize qualitative data while validating insights with human interpretation and context.'
      },
      {
        id: 'pr-4',
        text: 'Structure and conduct an effective interview that gets beyond the surface opinions (what users say) to reveal user goals (what users need).'
      },
      {
        id: 'pr-5',
        text: 'Create surveys to gather customer data. Understands survey best practices, can mitigate bias. Knows the right type of survey to use.'
      }
    ]
  },
  {
    id: 'secondary-research',
    name: 'Secondary research',
    slug: 'secondary-research',
    statements: [
      {
        id: 'sr-1',
        text: 'Builds domain knowledge of the product landscape, customer segments, and emerging trends.'
      },
      {
        id: 'sr-2',
        text: 'Compiles and analyzes customer feedback from support, success, and other data sources to identify common pain points.'
      },
      {
        id: 'sr-3',
        text: 'Uses secondary sources (market reports, online communities, trend analyses) to validate or refine hypotheses.'
      },
      {
        id: 'sr-4',
        text: 'Leverages AI to sift through large datasets of customer feedback, surface recurring themes, and uncover relevant articles or external signals to turn noise into structured insight.'
      },
      {
        id: 'sr-5',
        text: 'Studies how competitors and adjacent products solve similar problems, documenting patterns, differentiators, and opportunities for innovation.'
      }
    ]
  },
  {
    id: 'opportunity-mapping',
    name: 'Opportunity mapping',
    slug: 'opportunity-mapping',
    statements: [
      {
        id: 'om-1',
        text: 'Creates customer and user journeys that visualize real behaviors, motivations, and friction points.'
      },
      {
        id: 'om-2',
        text: 'Identifies areas of improvement and communicates them across teams so everyone understands where they can add value.'
      },
      {
        id: 'om-3',
        text: 'Defines user needs and goals through synthesis, personas, or jobs-to-be-done frameworks.'
      },
      {
        id: 'om-4',
        text: 'Facilitates collaborative mapping and ideation sessions to uncover opportunities and align teams around shared understanding.'
      },
      {
        id: 'om-5',
        text: 'Translates insights into clear problem statements, hypotheses, or early solution concepts that guide design direction.'
      }
    ]
  },
  {
    id: 'usability-evaluation',
    name: 'Usability evaluation',
    slug: 'usability-evaluation',
    statements: [
      {
        id: 'ue-1',
        text: 'Uses established usability principles and guidelines to predict likely problems in user interfaces before testing.'
      },
      {
        id: 'ue-2',
        text: 'Has experience with a wide range of usability test types and knows when to apply each method, including first-click testing, task-based testing, card sorting, tree testing, and prototype walkthroughs.'
      },
      {
        id: 'ue-3',
        text: 'Plans and executes usability tests using remote and asynchronous tools, applying best practices and mitigating bias.'
      },
      {
        id: 'ue-4',
        text: 'Advocates for solving usability problems based on evidence and user feedback.'
      },
      {
        id: 'ue-5',
        text: 'Integrates usability evaluation throughout the design process, using AI or automated tools when appropriate to identify friction points and validate design improvements early.'
      }
    ]
  },
  {
    id: 'data-informed-decision-making',
    name: 'Data informed decision making',
    slug: 'data-informed-decision-making',
    statements: [
      {
        id: 'didm-1',
        text: 'Defines measurable success criteria based on business and user goals, using frameworks like HEART or AARRR.'
      },
      {
        id: 'didm-2',
        text: 'Explores product analytics tools (such as Sigma, Heap, or FullStory) to investigate patterns and uncover behavioral insights.'
      },
      {
        id: 'didm-3',
        text: 'Forms strong, testable hypotheses grounded in data and user behavior.'
      },
      {
        id: 'didm-4',
        text: 'Plans and executes A/B or multivariate tests, controlling variables to isolate cause and effect.'
      },
      {
        id: 'didm-5',
        text: 'Pairs quantitative metrics with qualitative data to understand users behaviour behind the numbers.'
      }
    ]
  },
  {
    id: 'workshop-facilitation',
    name: 'Workshop facilitation',
    slug: 'workshop-facilitation',
    statements: [
      {
        id: 'wf-1',
        text: 'Selects the right facilitation methods and tools for the research or design need and adapts when discussions shift or unexpected issues arise.'
      },
      {
        id: 'wf-2',
        text: 'Guides participants through activities that build empathy, uncover insights, or generate solutions.'
      },
      {
        id: 'wf-3',
        text: 'Manages group dynamics through time management, structured discussion, and clear communication.'
      },
      {
        id: 'wf-4',
        text: 'Synthesizes inputs and outcomes into actionable next steps that connect to the broader design process.'
      },
      {
        id: 'wf-5',
        text: 'Uses AI tools to assist with preparation, idea clustering, or post-workshop synthesis to help the team focus on creativity and critical thinking.'
      }
    ]
  },
  {
    id: 'experience-architecture',
    name: 'Experience architecture',
    slug: 'experience-architecture',
    statements: [
      {
        id: 'ea-1',
        text: 'Understand how information should flow and present itself, can organize content effectively.'
      },
      {
        id: 'ea-2',
        text: 'Uses methods like card sorting and tree testing to inform navigation and hierarchy.'
      },
      {
        id: 'ea-3',
        text: 'Analyse a journey map to identify and construct an information architecture.'
      },
      {
        id: 'ea-4',
        text: 'Breaks down large structural changes into smaller, manageable iterations based on resources and risk.'
      },
      {
        id: 'ea-5',
        text: 'Designs scalable frameworks and naming systems that maintain clarity as products evolve.'
      }
    ]
  },
  {
    id: 'prototyping',
    name: 'Prototyping',
    slug: 'prototyping',
    statements: [
      {
        id: 'pt-1',
        text: 'Explore multiple approaches to a problem before deciding on a solution.'
      },
      {
        id: 'pt-2',
        text: 'Create interactive, shareable prototypes at various levels of fidelity that are used to inspire, unblock, redisk, clarify, and handoff designs.'
      },
      {
        id: 'pt-3',
        text: 'Organizes, structures, and annotates screen flows to communicate logic and user intent.'
      },
      {
        id: 'pt-4',
        text: 'Uses advanced Figma features such as Auto Layout and component libraries to produce developer-ready designs.'
      },
      {
        id: 'pt-5',
        text: 'Experiments with AI-powered prototyping tools to simulate dynamic states, generate design variations, or model real-world user interactions beyond static flows.'
      }
    ]
  },
  {
    id: 'experience-design',
    name: 'Experience design',
    slug: 'experience-design',
    statements: [
      {
        id: 'ed-1',
        text: 'Understands how people expect interfaces to behave, stays current on new patterns, and applies those insights consistently within the product\'s design language.'
      },
      {
        id: 'ed-2',
        text: 'Chooses experience models that guide behavior intentionally, balancing structure with exploration based on user goals and context (for example, deciding when to guide users through a step-by-step wizard versus allowing freeform navigation).'
      },
      {
        id: 'ed-3',
        text: 'Selects and applies the correct components or patterns to shape interaction behavior and provide clear affordances (for example, choosing a segmented control instead of a radio button when users need to toggle between related options).'
      },
      {
        id: 'ed-4',
        text: 'Defines end-to-end flows that connect tasks, states, and touchpoints into coherent user journeys.'
      },
      {
        id: 'ed-5',
        text: 'Maps interaction scenarios, including edge cases and unhappy paths, and documents expected behaviors so intent carries through to development.'
      }
    ]
  },
  {
    id: 'visual-design',
    name: 'Visual design',
    slug: 'visual-design',
    statements: [
      {
        id: 'vd-1',
        text: 'Applies fundamental principles of contrast, alignment, hierarchy, rhythm, and spacing to create clarity and balance in design.'
      },
      {
        id: 'vd-2',
        text: 'Uses typography, color, iconography, and grid systems to build structured, accessible compositions.'
      },
      {
        id: 'vd-3',
        text: 'Employs visual elements such as imagery, iconography, or illustration to support understanding and reinforce meaning.'
      },
      {
        id: 'vd-4',
        text: 'Maintains and evolves the product\'s visual language to ensure consistency across screens, states, and experiences.'
      },
      {
        id: 'vd-5',
        text: 'Incorporates motion and visual feedback to reinforce hierarchy, guide attention, and bring interfaces to life.'
      }
    ]
  },
  {
    id: 'ux-writing',
    name: 'UX writing',
    slug: 'ux-writing',
    statements: [
      {
        id: 'uw-1',
        text: 'Writes and edits both macro and microcopy that support user understanding and product goals.'
      },
      {
        id: 'uw-2',
        text: 'Uses and evolves the shared content style and tone of voice to maintain consistency and convey brand personality.'
      },
      {
        id: 'uw-3',
        text: 'Writes with purpose — never relying on placeholder text — and collaborates early to ensure content reflects real user needs and context.'
      },
      {
        id: 'uw-4',
        text: 'Understands product and feature value propositions and applies them appropriately across user touchpoints.'
      },
      {
        id: 'uw-5',
        text: 'Experiments with AI tools to generate, refine, or localize content while maintaining editorial judgment and human empathy.'
      }
    ]
  },
  {
    id: 'technical-fluency',
    name: 'Technical fluency',
    slug: 'technical-fluency',
    statements: [
      {
        id: 'tf-1',
        text: 'Understands platform conventions across digital mediums such as fluid web, iOS, Android, wearables, voice, and emerging interfaces like AR or VR.'
      },
      {
        id: 'tf-2',
        text: 'Anticipates opportunities and constraints within each technology and collaborates with engineers to determine implementation paths.'
      },
      {
        id: 'tf-3',
        text: 'Navigates front-end languages such as HTML, CSS, and JavaScript to communicate design intent, perform VQA, and negotiate implementation trade-offs.'
      },
      {
        id: 'tf-4',
        text: 'Understands modern layout systems (for example, flexbox and CSS grid) and common components (for example, form inputs, attributes, and accessibility patterns).'
      },
      {
        id: 'tf-5',
        text: 'Partners with developers and data teams to explore how AI can shape adaptive or generative interfaces, using intelligent systems to personalize, automate, or scale design decisions.'
      }
    ]
  },
  {
    id: 'storytelling',
    name: 'Storytelling',
    slug: 'storytelling',
    statements: [
      {
        id: 'st-1',
        text: 'Structures presentations and artifacts to explain the problem, the solution, and the reasoning behind design decisions.'
      },
      {
        id: 'st-2',
        text: 'Adapts communication style to match the audience, maintaining engagement and clarity with partners across disciplines.'
      },
      {
        id: 'st-3',
        text: 'Frames problems and opportunities in ways that inspire alignment, motivate action, and connect to broader company goals.'
      },
      {
        id: 'st-4',
        text: 'Uses storytelling to bridge design and go-to-market strategies, translating user insights and product value into narratives that resonate internally and externally.'
      },
      {
        id: 'st-5',
        text: 'Promotes the value of design thinking and fosters organizational understanding of user experience across product, marketing, and technology functions.'
      }
    ]
  }
];

export const SCORING_GUIDE = {
  1: {
    label: 'Awareness',
    description: 'Understand what the skill is, why it matters, and can recognize it in others\' work.'
  },
  2: {
    label: 'Emerging',
    description: 'Apply the skill in straightforward situations with guidance or reference examples, but still developing confidence and adaptability.'
  },
  3: {
    label: 'Established',
    description: 'Use the skill independently in day-to-day work and adapt it effectively to different projects or contexts.'
  },
  4: {
    label: 'Advanced',
    description: 'Apply the skill strategically, mentor others, and improve how the team or organization practices it.'
  },
  5: {
    label: 'Authority',
    description: 'Shape best practices, teach or publish about the skill, and drive innovation in how it\'s applied across the organization or industry.'
  }
};

export const ASSESSMENT_CONTEXT = "Be honest with yourself! Remember this isn\'t a test, it\'s a map. A lower score just means there\'s room to explore or skills you haven\'t stretched yet. A 3 (Established) is what we\'d expect from most senior designers. 4s and 5s are where you start shaping how others work, not just how you do.";