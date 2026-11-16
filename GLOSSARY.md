# Dahlia Tracker

The language of one home grower's dahlia garden over the years: which varieties they keep, how many tubers survive each winter, where they get planted, which seedlings they raise, and which tubers go to friends.

## Language

### People

**Grower**:
The person whose garden this is. They keep the varieties, count the tubers, plant the beds, and decide what to share.
_Avoid_: Admin, owner, user

**Friend**:
A person the **Grower** shares surplus tubers with. Friends browse the **Storefront** and make **Reservations**.
_Avoid_: Customer, buyer, recipient, guest

### Plants

**Variety**:
A distinct, named or coded kind of dahlia the **Grower** keeps. It stays in the catalog even after none of its tubers are left.
_Avoid_: Cultivar, plant, flower

**Seedling**:
A **Variety** the **Grower** raised from seed. It becomes a Seedling when it survives the growing tray and is planted out to the **Fenceline**. Tray seedlings that don't make it are never recorded.
_Avoid_: Seed, sprout, hybrid

**Seedling Code**:
The code a **Seedling** gets when it is planted out: the **Season**'s two-digit year and its number among that year's survivors, such as `27-01`. A Seedling whose label was lost goes by `?-` and the year instead, such as `?-2026`.
_Avoid_: Seed number, ID

**Volunteer**:
A **Seedling** that sowed itself in the garden. It gets a **Seedling Code** like any other, but has no known **Seed Parent**.
_Avoid_: Self-seeder, wild seedling

**Seed Parent**:
The **Variety** whose bloom produced the seed a **Seedling** grew from. It is usually known, but not for a self-sown Seedling or one whose label was lost.
_Avoid_: Mother, female parent

**Pollen Parent**:
The **Variety** that pollinated the **Seed Parent**'s bloom. It is known only for hand-made crosses, so it is usually unrecorded.
_Avoid_: Father, male parent

### Garden

**Bed**:
One of the **Grower**'s three main garden beds (Backbed 1, 2, and 3): the showroom for the **Varieties** they like most.
_Avoid_: Plot, row, garden

**Fenceline**:
The planting strip along the fence. It holds overflow **Varieties** kept for their own sake and the **Seedlings** being trialled, and it is where a **Variety** usually earns a move to a **Bed**.
_Avoid_: Border, overflow bed

### Seasons and counting

**Season**:
One growing year, named for its year: the **Spring Count**, planting, blooming, and the fall dig that produces the next Season's tubers. Tubers dug in fall 2026 are Season 2027 tubers.
_Avoid_: Storage year, year

**Spring Count**:
The **Grower**'s yearly count of a **Variety**'s tubers when they come out of storage, sorted into budded, non-budded, and rotten. It is the authoritative starting count for a **Season**.
_Avoid_: Sort, assessment, inventory

**Fall Count**:
An optional count of the tubers a **Variety** produced when the **Grower** divided its clumps in the fall. When it exists, the next **Spring Count** is checked against it.
_Avoid_: Add, division count, storage count

**Season Note**:
The **Grower**'s observations of a **Variety** in one **Season**, such as how it bloomed and whether it deserves a **Bed**. Notes about the Variety in general belong to the Variety itself.
_Avoid_: Journal, log, comment

**Gone**:
A **Variety** with no tubers left and none planted in the current **Season**, so nothing will be dug to carry it on. It stays in the catalog and its history explains why: rot, giveaways, or a **Seedling** that failed.
_Avoid_: Discarded, deleted, inactive, retired

**Keep Count**:
How many of a **Variety**'s tubers the **Grower** sets aside for their own garden in a **Season**, before anything is offered to **Friends**.
_Avoid_: Personal pick, holdback

**Cover Photo**:
The one photo the **Grower** picks to represent a **Variety** in a **Season**, out of the possibly several taken that year.
_Avoid_: Thumbnail, main photo, hero image

**Favorites Ranking**:
The **Grower**'s single, ongoing order of every **Variety** from most to least liked. It is built up from side-by-side "which do you like more?" choices.
_Avoid_: Rating, score, favorites list

### Sharing

**Storefront**:
The **Friend**-facing view of the **Varieties** and their tubers in the current **Season**. Anyone can browse it. **Reservations** can be made only while the **Grower** has it open, between the **Spring Count** and planting.
_Avoid_: Shop, store, catalog

**Available**:
A **Variety**'s on-hand tubers in a **Season**, minus its **Keep Count**, minus tubers already under **Reservation**.
_Avoid_: Surplus, extra, in stock

**Reservation**:
A **Friend**'s claim on a number of a **Variety**'s tubers for a **Season**. It takes effect immediately and reduces what is **Available** to everyone else. The **Grower** either fulfills it by handing the tubers over or cancels it.
_Avoid_: Order, request, purchase, claim

**Free Pile**:
Tubers the **Grower** sets out on the corner at the end of spring for anyone passing by to take. These are leftovers, not a judgement on the **Variety**.
_Avoid_: Curb, discard, donation
