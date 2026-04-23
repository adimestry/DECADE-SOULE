/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Option {
  id: string;
  text: string;
  color: 'red' | 'blue' | 'yellow';
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Your morning begins. What is the first sensory input you crave?",
    options: [
      { id: 'a', text: 'The precise hum of a precision coffee machine.', color: 'blue' },
      { id: 'b', text: 'The crackle of a vinyl record playing soft jazz.', color: 'red' },
      { id: 'c', text: 'The immediate glow of a scrolling neon screen.', color: 'yellow' },
      { id: 'd', text: 'Silence. Cold air and the smell of fresh ink.', color: 'blue' },
    ]
  },
  {
    id: 2,
    text: "How do you prefer to spend a Friday evening?",
    options: [
      { id: 'a', text: 'In a smoky underground club with avant-garde poetry.', color: 'red' },
      { id: 'b', text: 'At a futuristic gallery opening with digital projections.', color: 'yellow' },
      { id: 'c', text: 'Hosting a dinner with geometric plates and jazz.', color: 'blue' },
      { id: 'd', text: 'Dancing under a mirrored ball to electric synthesis.', color: 'yellow' },
    ]
  },
  {
    id: 3,
    text: "Pick an accessory that defines your 'soul' aesthetic.",
    options: [
      { id: 'a', text: 'A heavy leather jacket with metallic zippers.', color: 'red' },
      { id: 'b', text: 'Strict circular wire-frame glasses.', color: 'blue' },
      { id: 'c', text: 'A bright, plastic-molded wristwatch.', color: 'yellow' },
      { id: 'd', text: 'A silk scarf with hand-painted abstract patterns.', color: 'red' },
    ]
  },
  {
    id: 4,
    text: "When entering a room, what do you notice first?",
    options: [
      { id: 'a', text: 'The architectural skeleton and structural lines.', color: 'blue' },
      { id: 'b', text: 'The warmth of the conversation and communal energy.', color: 'red' },
      { id: 'c', text: 'The vibrancy of the textures and experimental light.', color: 'yellow' },
      { id: 'd', text: 'The efficiency of the space and hidden technology.', color: 'blue' },
    ]
  },
  {
    id: 5,
    text: "What is your primary relationship with 'The Future'?",
    options: [
      { id: 'a', text: 'Unbridled optimism. Tomorrow will be neon.', color: 'yellow' },
      { id: 'b', text: 'Cautious precision. We must design it carefully.', color: 'blue' },
      { id: 'c', text: 'Rebellion. The future is ours to disrupt.', color: 'red' },
      { id: 'd', text: 'Nostalgia for what the future used to look like.', color: 'red' },
    ]
  },
  {
    id: 6,
    text: "Which sounds most like your ideal form of transport?",
    options: [
      { id: 'a', text: 'A sleek, chrome-plated locomotive.', color: 'blue' },
      { id: 'b', text: 'A wood-paneled convertible with no destination.', color: 'red' },
      { id: 'c', text: 'A high-speed train cutting through a megacity.', color: 'yellow' },
      { id: 'd', text: 'A bicycle with exposed gears and a leather seat.', color: 'blue' },
    ]
  },
  {
    id: 7,
    text: "At a party, you are likely to be found...",
    options: [
      { id: 'a', text: 'Discussing the philosophy of structural change.', color: 'blue' },
      { id: 'b', text: 'In the middle of the dancefloor, leading a move.', color: 'yellow' },
      { id: 'c', text: 'Sitting in a dark corner, observing the patterns.', color: 'red' },
      { id: 'd', text: 'By the bar, mixing a classic, precise cocktail.', color: 'blue' },
    ]
  },
  {
    id: 8,
    text: "Your ideal workspace consists of...",
    options: [
      { id: 'a', text: 'A single primary-colored desk and a metal lamp.', color: 'blue' },
      { id: 'b', text: 'A cozy mess of plants, sketches, and fabrics.', color: 'red' },
      { id: 'c', text: 'Dual monitors and a glowing purple keyboard.', color: 'yellow' },
      { id: 'd', text: 'A portable tablet in a bustling metropolitan café.', color: 'yellow' },
    ]
  },
  {
    id: 9,
    text: "Pick a 'Revolution' that excites you most.",
    options: [
      { id: 'a', text: 'The Industrial: Machines serving humanity.', color: 'blue' },
      { id: 'b', text: 'The Cultural: Art becoming the streets.', color: 'red' },
      { id: 'c', text: 'The Digital: Information without borders.', color: 'yellow' },
      { id: 'd', text: 'The Space: Humanity amongst the stars.', color: 'yellow' },
    ]
  },
  {
    id: 10,
    text: "Finally, how should a story end?",
    options: [
      { id: 'a', text: 'With a logical, satisfying conclusion.', color: 'blue' },
      { id: 'b', text: 'With an ambiguous, beautiful tragedy.', color: 'red' },
      { id: 'c', text: 'With a cliffhanger into a sequel.', color: 'yellow' },
      { id: 'd', text: 'With a celebration and a loud finale.', color: 'red' },
    ]
  },
];

export const DECADE_MUSIC: Record<string, string> = {
  '1920s': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholders
  '1930s': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  '1940s': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  '1950s': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  '1960s': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  '1970s': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  '1980s': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  '1990s': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  '2000s': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
  '2010s': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
};
