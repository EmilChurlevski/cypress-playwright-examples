export class DataGenerator {

  /**
   * Returns a random birthday between start and end
   */
  public static getRandomBirthday(): string {
    const end: Date = new Date();
    const start: Date = new Date(1900, 0, 0);
    const birthday: Date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return birthday.toLocaleString('en-US',  {
      day: '2-digit',
      month: 'long',
      year: 'numeric' })
  }

  /**
   * available cities per state object
   * @private used in getRandomCity()
   */
  private static availableCitiesFromState = {
    'NCR': ['Delhi', 'Gurgaon', 'Noida'],
    'Uttar Pradesh': ['Agra', 'Lucknow', 'Merrut'],
    'Haryana': ['Karnal', 'Panipat'],
    'Rajasthan': ['Jaipur', 'Jaiselmer']
  }

  /**
   * It gets a random city from the desired state
   * @param state from which state to get a random city
   */
  public static getRandomCity(state: string): string {
    const cities = this.availableCitiesFromState[state];
    return cities[Math.floor(Math.random() * cities.length)];
  }

  /**
   * Returns a random email
   */
  public static getRandomEmail(): string {
    return new Date().valueOf() + '@automation-rocks.com';
  }

  /**
   * Returns a random hobby
   */
  public static getRandomHobby(): string {
    const hobbies: string[] = ['Sports', 'Reading', 'Music'];
    return hobbies[Math.floor(Math.random() * hobbies.length)];
  }

  /**
   * Returns a random name
   */
  public static getRandomName(): string {
    const names: string[] = [
      'Time', 'Past', 'Future', 'Dev',
      'Fly', 'Flying', 'Soar', 'Soaring', 'Power', 'Falling',
      'Fall', 'Jump', 'Cliff', 'Mountain', 'Rend', 'Red', 'Blue',
      'Green', 'Yellow', 'Gold', 'Demon', 'Demonic', 'Panda', 'Cat',
      'Kitty', 'Kitten', 'Zero', 'Memory', 'Trooper', 'XX', 'Bandit',
      'Fear', 'Light', 'Glow', 'Tread', 'Deep', 'Deeper', 'Deepest',
      'Mine', 'Your', 'Worst', 'Enemy', 'Hostile', 'Force', 'Video',
      'Game', 'Donkey', 'Mule', 'Colt', 'Cult', 'Cultist', 'Magnum',
      'Gun', 'Assault', 'Recon', 'Trap', 'Trapper', 'Redeem', 'Code',
      'Script', 'Writer', 'Near', 'Close', 'Open', 'Cube', 'Circle',
      'Geo', 'Genome', 'Germ', 'Spaz', 'Shot', 'Echo', 'Beta', 'Alpha',
      'Gamma', 'Omega', 'Seal', 'Squid', 'Money', 'Cash', 'Lord', 'King',
      'Duke', 'Rest', 'Fire', 'Flame', 'Morrow', 'Break', 'Breaker', 'Numb',
      'Ice', 'Cold', 'Rotten', 'Sick', 'Sickly', 'Janitor', 'Camel', 'Rooster',
      'Sand', 'Desert', 'Dessert', 'Hurdle', 'Racer', 'Eraser', 'Erase', 'Big',
      'Small', 'Short', 'Tall', 'Sith', 'Bounty', 'Hunter', 'Cracked', 'Broken',
      'Sad', 'Happy', 'Joy', 'Joyful', 'Crimson', 'Destiny', 'Deceit', 'Lies',
      'Lie', 'Honest', 'Destined', 'Bloxxer', 'Hawk', 'Eagle', 'Hawker', 'Walker',
      'Zombie', 'Sarge', 'Capt', 'Captain', 'Punch', 'One', 'Two', 'Uno', 'Slice',
      'Slash', 'Melt', 'Melted', 'Melting', 'Fell', 'Wolf', 'Hound',
      'Legacy', 'Sharp', 'Dead', 'Mew', 'Chuckle', 'Bubba', 'Bubble', 'Sandwich',
      'Smasher', 'Extreme', 'Multi', 'Universe', 'Ultimate', 'Death', 'Ready', '' +
      'Monkey', 'Elevator', 'Wrench', 'Grease', 'Head', 'Theme', 'Grand', 'Cool',
      'Kid', 'Boy', 'Girl', 'Vortex', 'Paradox'
    ];
    return names[Math.floor(Math.random() * names.length)];
  }

  /**
   * Returns a random salutation
   */
  public static getRandomSalutation(): string {
    const salutations: string[] = ['Male', 'Female', 'Other'];
    return salutations[Math.floor(Math.random() * salutations.length)];
  }

  /**
   * Returns a random state
   */
  public static getRandomState(): string {
    const states: string[] = ['NCR', 'Uttar Pradesh', 'Haryana', 'Rajasthan'];
    return states[Math.floor(Math.random() * states.length)];
  }


  /**
   * Returns a random 10 digit number
   */
  public static getRandomTenDigits(): number {
   return Math.floor(Math.random() * 9000000000) + 1000000000;
  }

}