"use strict";

function BioService () {
  const vm = this;

  vm.Achilles = 'The most famous Greek in the Trojan War, whose strength and bravery are unrivaled. Achilles is selfless, courageous, and devoted to the gods—he is the finest Greek warrior. His mother, the sea-nymph Thetis, has made him invulnerable everywhere except his heel, and that is where he is struck and killed.';

  vm.Athena = ' Roman name: Minerva. Usually just called Athena, this goddess emerges from Zeus’s head fully-grown and armed. Associated with war, cleverness, and wit, it is no surprise that she favors Odysseus. Athena is the goddess of Wisdom, Reason, and Purity and is chaste, like Artemis and Hestia.';

  vm.Cerebrus = ' A vile three-headed dog that guards the gates of Hades.';

  vm.Hades = 'Roman name: Pluto. The brother of Zeus and Poseidon, Hades rules the underworld, the realm of the dead, with his wife, Persephone.';

  vm.Hercules = 'Another famous Greek hero, a son of Zeus who rises to Olympus at his death. Hercules is renowned for his incredible strength and bravery, but he lacks intelligence and self-control. Most of his adventures begin with a horrible mistake that he makes and then attempts to fix. His most famous feats, the Twelve Labors of Hercules, are the punishment he receives for murdering his family in a fit of madness.';

  vm.Polyphemus = 'The terrible Cyclops who imprisons Odysseus and his men and eats them alive. They escape only after blinding him. In later myths, he becomes a pitiful character who recovers his sight but chases after the cruel nymph Galatea who mocks him.';

  vm.Poseidon = 'Roman name: Neptune. The god of the sea, Poseidon is Zeus’s brother and second only to him in power. Poseidon holds a decade-long grudge against Odysseus. The often cruel and unpredictable violence of the seas is assumed to be a result of his anger.';

  vm.Siren = 'The Sirens were beautiful but dangerous creatures that lured the sailors with their beautiful voices to their doom, causing the ships to crash on the reefs near their island. They were the daughters of the river god Achelous, while their mother may have been Terpsichore, Melpomene, Sterope or Chthon. Although closely linked to marine environments, they were not considered sea deities. The texts mentioning the Sirens provide different opinions as to their number and their names; some mention two or three; others mention more.';

  vm.Zeus = 'Roman name: Jupiter or Jove. The sky-god Zeus rules Mount Olympus. His weapon is the thunderbolt, and his bird is the eagle. The central figure of the myths, Zeus epitomizes their complexity. At times he is divine and represents a pure, eternal sense of justice; at other times, he is capricious and cruel.';

}

angular
  .module("app")
  .service("BioService", BioService);