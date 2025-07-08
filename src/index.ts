import { Inventory } from "./lib/Inventory";

const my_inventory = new Inventory();

my_inventory.add("1234", "Death Row (Alibis collection)", 2004);
my_inventory.add("765765", "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones", 2004, 120, 'pdf');
my_inventory.add("55357", "Mathematical Elements for Computer Graphics (2nd Edition)", 2023, 200, 6);

my_inventory.showBooks();

// my_inventory.remove();

my_inventory.buy('765765', 3, "example@mail.com");
my_inventory.buy('55357', 6, "example@mail.com", "Cairo Egypt");
my_inventory.showBooks();
// my_inventory.buy('55357', 1, "example@mail.com", "Cairo Egypt");
