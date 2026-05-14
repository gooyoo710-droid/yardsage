export interface PlantDetail {
  care: {
    watering: string
    sunlight: string
    soil: string
  }
  seasons: {
    bestPlantingTime: string
    bloomOrGrowth: string
    dormancy: string
  }
  problems: {
    problem: string
    solution: string
  }[]
  amazonSearchTerm: string
}

export const PLANT_DETAILS: Record<string, PlantDetail> = {
  'eastern-redbud': {
    care: {
      watering: 'Water deeply once a week during the first growing season. Mature trees are drought-tolerant — water every 2–3 weeks during dry summers. Avoid standing water around the root zone.',
      sunlight: 'Best in full sun to part shade (4–8 hours daily). In hot climates, afternoon shade reduces heat stress and extends bloom time.',
      soil: 'Prefers moist, well-drained loam or clay. Tolerates pH 5.5–8.0. Amend heavy clay with compost to improve drainage.',
    },
    seasons: {
      bestPlantingTime: 'Fall or early spring while dormant. Soil temperatures between 50–65°F promote strong root establishment.',
      bloomOrGrowth: 'Flowers magenta-pink in March–April before leaves emerge. Heart-shaped foliage provides summer interest; yellow fall color.',
      dormancy: 'Enters dormancy after first frost (October–November). Seedpods persist on branches through winter, adding texture.',
    },
    problems: [
      { problem: 'Canker disease (Botryosphaeria)', solution: 'Prune affected branches 6–8 inches below visible infection. Sterilize pruning tools with 10% bleach solution between cuts.' },
      { problem: 'Verticillium wilt (sudden wilting)', solution: 'No chemical cure. Remove severely affected branches. Improve soil drainage; avoid overwatering.' },
      { problem: 'Scale insects on bark', solution: 'Apply dormant horticultural oil in late winter. Use insecticidal soap spray in spring when crawlers are active.' },
    ],
    amazonSearchTerm: 'Eastern Redbud tree live plant',
  },

  'knockout-rose': {
    care: {
      watering: 'Water at the base (not on foliage) once or twice a week. Allow the top inch of soil to dry between waterings. Mulch 2–3 inches around the base to retain moisture.',
      sunlight: 'Requires at least 6 hours of direct sun daily. More sun = more blooms. Avoid locations with only morning shade.',
      soil: 'Rich, well-drained loam with pH 6.0–6.5. Incorporate compost at planting. Fertilize monthly spring through summer with a rose-specific fertilizer.',
    },
    seasons: {
      bestPlantingTime: 'Spring after last frost or fall 6 weeks before first frost. Container-grown plants can go in almost any season.',
      bloomOrGrowth: 'Blooms continuously from late April through first hard frost. Deadheading is not required but light shearing encourages fresh flushes.',
      dormancy: 'Semi-dormant in winter in zones 4–6. Prune back by one-third in early spring when forsythia blooms.',
    },
    problems: [
      { problem: 'Black spot (dark leaf spots)', solution: 'Knockout Roses are resistant but not immune. Remove affected leaves, improve air circulation, and apply neem oil spray.' },
      { problem: 'Japanese beetle defoliation', solution: 'Hand-pick in early morning and drop into soapy water. Apply pyrethrin spray for heavy infestations.' },
      { problem: 'Rose rosette disease (red, distorted growth)', solution: 'No cure. Remove and destroy the entire plant immediately to prevent spread to neighbors.' },
    ],
    amazonSearchTerm: 'Knockout Rose bush live plant',
  },

  'black-eyed-susan': {
    care: {
      watering: 'Extremely drought-tolerant once established. Water new transplants weekly for the first month. After establishment, rainfall is usually sufficient except during prolonged drought.',
      sunlight: 'Full sun preferred (6+ hours). Tolerates light shade but blooms are reduced. Best color in full sun exposures.',
      soil: 'Thrives in poor to average, well-drained soil. Does NOT need rich soil — over-fertilizing causes floppy stems and fewer flowers. pH 6.0–7.0.',
    },
    seasons: {
      bestPlantingTime: 'Direct sow seed in early spring (after last frost) or fall. Transplant established plants in spring or early fall.',
      bloomOrGrowth: 'Flowers July through October. Self-seeds prolifically — allow seedheads to remain for natural spreading and winter bird food.',
      dormancy: 'Dies back to ground after frost. Perennial roots survive; new growth emerges in April. Leave stems standing for wildlife.',
    },
    problems: [
      { problem: 'Powdery mildew (white coating on leaves)', solution: 'Improve air circulation by spacing plants 18 inches apart. Apply potassium bicarbonate or diluted neem oil spray.' },
      { problem: 'Crown rot from overwatering', solution: 'Ensure excellent drainage. Avoid mulching directly against the crown. Reduce watering frequency.' },
      { problem: 'Aphid clusters on new growth', solution: 'Blast off with a strong water stream. Introduce ladybugs or lacewings. Insecticidal soap as last resort.' },
    ],
    amazonSearchTerm: 'Black Eyed Susan Rudbeckia seeds perennial',
  },

  'bermuda-grass': {
    care: {
      watering: 'Water deeply (1 inch per week) to encourage deep root growth. Water early morning to reduce evaporation. Bermuda tolerates drought by going dormant — it will green up when rain returns.',
      sunlight: 'Demands full sun (8+ hours). Will thin out rapidly in shade. The most sun-loving of all common lawn grasses.',
      soil: 'Adapts to nearly any well-drained soil, pH 6.0–7.0. Apply 1–2 lbs nitrogen per 1,000 sq ft monthly during growing season (April–September).',
    },
    seasons: {
      bestPlantingTime: 'Late spring (soil temp above 65°F). Seed or sod between May and July for best establishment.',
      bloomOrGrowth: 'Actively grows April through October in most regions. Spreads aggressively via stolons and rhizomes — can overtake garden beds.',
      dormancy: 'Turns brown and dormant after first frost. Greens up quickly in spring once soil warms. Overseed with ryegrass for winter color.',
    },
    problems: [
      { problem: 'Thatch buildup (spongy lawn)', solution: 'Dethatch aggressively in late spring with a vertical mower or power rake every 1–2 years.' },
      { problem: 'Invasion into flower beds', solution: 'Install a 4–6 inch metal edging barrier. Hand-pull runners regularly. Spot-treat with grass-selective herbicide.' },
      { problem: 'Dollar spot fungal disease (silver dollar-sized brown spots)', solution: 'Apply nitrogen fertilizer to strengthen turf. Use fungicide (thiophanate-methyl) for severe cases.' },
    ],
    amazonSearchTerm: 'Bermuda grass seed lawn',
  },

  'purple-coneflower': {
    care: {
      watering: 'Water weekly during the first growing season. Once established, highly drought-tolerant — water only during extended dry spells (no rain for 3+ weeks). Overwatering is the primary killer.',
      sunlight: 'Full sun strongly preferred (6–8+ hours). Tolerates light afternoon shade in the South. Shade causes weak, floppy stems.',
      soil: 'Average to poor, well-drained soil with pH 6.0–7.0. Does not need amendment or fertilizer. Rich soil causes flopping and reduced flowering.',
    },
    seasons: {
      bestPlantingTime: 'Spring after last frost or early fall. From seed, start indoors 8–10 weeks before last frost (needs cold stratification for best germination).',
      bloomOrGrowth: 'Blooms July–September. Leave seedheads standing through winter — goldfinches depend on them. Deadhead some for tidiness, leave others for self-seeding.',
      dormancy: 'Dies back fully after hard frost. Divide clumps every 3–4 years in spring to maintain vigor.',
    },
    problems: [
      { problem: 'Aster yellows disease (distorted flowers, yellowing)', solution: 'No cure. Remove and destroy infected plants immediately. Control leafhoppers (the vector) with insecticidal soap.' },
      { problem: 'Japanese beetle feeding on petals', solution: 'Hand-pick in early morning. Neem oil spray deters feeding. Avoid Japanese beetle traps (they attract more beetles).' },
      { problem: 'Root rot from poor drainage', solution: 'Move to raised bed or improve drainage with coarse grit. Never let plants sit in standing water.' },
    ],
    amazonSearchTerm: 'Purple Coneflower Echinacea live plants',
  },

  'texas-sage': {
    care: {
      watering: 'Water deeply once a month once established. More water in the first year only. Overwatering is fatal — this plant evolved for desert conditions with excellent drainage.',
      sunlight: 'Full sun only (8+ hours). Will not thrive in shade. Reflected heat from walls or pavement is beneficial.',
      soil: 'Rocky, sandy, or caliche desert soils. pH 7.0–8.0. Never amend with compost or add fertilizer — rich soil causes root rot and death.',
    },
    seasons: {
      bestPlantingTime: 'Fall (September–November) in desert regions — gives roots time to establish before summer heat.',
      bloomOrGrowth: 'Flowers profusely after monsoon rains or high humidity events (hence the nickname "Barometer Bush"). Peak bloom July–October.',
      dormancy: 'Evergreen in zones 8–10. May lose some leaves in a hard freeze but recovers quickly. No true dormancy in mild winters.',
    },
    problems: [
      { problem: 'Root rot from overwatering or clay soil', solution: 'Ensure perfect drainage. Plant in raised beds or rocky slopes. Once root rot starts, the plant rarely recovers — prevention is essential.' },
      { problem: 'No blooming despite good care', solution: 'Stress triggers flowering. Reduce watering to once a month and expose to full sun. Too much comfort = no blooms.' },
      { problem: 'Cotton root rot in heavy soil', solution: 'Improve drainage dramatically. Plant in a 12-inch raised bed of sandy soil.' },
    ],
    amazonSearchTerm: 'Texas Sage Leucophyllum desert shrub plant',
  },

  'hydrangea': {
    care: {
      watering: 'Water deeply 3 times a week in summer heat. Hydrangeas wilt dramatically when thirsty (especially in afternoon) but recover with evening water. Mulch 3 inches deep to retain moisture.',
      sunlight: 'Morning sun (4–6 hours) with afternoon shade is ideal. Direct afternoon summer sun in hot climates causes wilting and leaf scorch.',
      soil: 'Rich, well-drained soil with pH 5.5–6.5 for blue flowers; pH 6.5–7.0 for pink. Add aluminum sulfate to lower pH (bluer); add lime to raise pH (pinker).',
    },
    seasons: {
      bestPlantingTime: 'Spring or fall. Avoid summer planting in hot climates. Give plants 6 weeks to establish before extreme heat or cold.',
      bloomOrGrowth: 'Blooms on old wood (previous year\'s stems). Flowers June–August. Faded blooms dry beautifully — leave them for winter interest.',
      dormancy: 'Prune sparingly in late summer ONLY after blooming. Never prune in fall or spring — you\'ll cut off next year\'s buds.',
    },
    problems: [
      { problem: 'No flowers (blooms cut off in pruning)', solution: 'Only prune immediately after blooming (late summer). Prune at any other time removes flower buds for next year.' },
      { problem: 'Powdery mildew on leaves', solution: 'Improve air circulation. Apply neem oil or potassium bicarbonate spray. Water at base, not on foliage.' },
      { problem: 'Wilting in afternoon heat', solution: 'Water deeply in the morning. Move container plants to shade. Afternoon wilt is normal in heat and recovers by morning.' },
    ],
    amazonSearchTerm: 'Bigleaf Hydrangea macrophylla live plant',
  },

  'crepe-myrtle': {
    care: {
      watering: 'Drought-tolerant once established (1+ year). Water weekly during first summer. Avoid overhead watering — promotes powdery mildew. Established trees need supplemental water only during extended drought.',
      sunlight: 'Requires 8+ hours of full sun for maximum blooms. Shade dramatically reduces flowering. Best planted away from large shade trees.',
      soil: 'Adaptable to most well-drained soils, pH 5.0–6.5. Apply slow-release fertilizer in spring. Avoid high-nitrogen fertilizers which reduce blooms.',
    },
    seasons: {
      bestPlantingTime: 'Spring through summer in warm climates. Container plants can be planted any time the ground isn\'t frozen.',
      bloomOrGrowth: 'Blooms June–September on new wood — one of the longest blooming trees in the South. Multiple bloom cycles possible with deadheading.',
      dormancy: 'Loses leaves after first frost. Do NOT "crape murder" (heavy pruning). Only remove dead wood and crossing branches in late winter.',
    },
    problems: [
      { problem: 'Powdery mildew (white powder on leaves)', solution: 'Choose mildew-resistant varieties (Natchez, Tuscarora). Improve air circulation. Apply fungicide as preventive in humid seasons.' },
      { problem: 'Aphid infestation (black sooty mold follows)', solution: 'Aphids attract ants which farm them. Control ants with sticky tree wrap. Spray aphids with strong water stream or insecticidal soap.' },
      { problem: '"Crape murder" (improper heavy pruning)', solution: 'Never top crape myrtles. Only prune to shape, remove suckers, and improve structure. Topping creates ugly knuckles and weakens the tree.' },
    ],
    amazonSearchTerm: 'Crape Myrtle tree live plant',
  },

  'lavender': {
    care: {
      watering: 'Water newly planted lavender weekly for the first month, then every 2–3 weeks. Once established (1 year), water only during prolonged drought. Lavender is more often killed by overwatering than drought.',
      sunlight: 'Absolute full sun (6–8+ hours). No exceptions. Even 4 hours of shade causes weak growth and poor flowering.',
      soil: 'Fast-draining, lean, sandy or gravelly soil is essential. pH 6.5–7.5. Add grit or coarse sand to heavy clay soil. Never amend with compost — lavender hates rich soil.',
    },
    seasons: {
      bestPlantingTime: 'Spring after last frost. Allow the full growing season to establish before winter. In mild climates, fall planting works well.',
      bloomOrGrowth: 'Peak bloom May–July. Shear back by one-third immediately after blooming to encourage a second flush and maintain compact shape.',
      dormancy: 'Semi-evergreen. Mulch with gravel (not bark) around base in cold winters. Never cut back hard in fall — wait until spring to see what survived.',
    },
    problems: [
      { problem: 'Root rot / Phytophthora (sudden collapse)', solution: 'Ensure perfect drainage — this is non-negotiable. Raise planting bed 6–12 inches. Once root rot sets in, the plant cannot be saved.' },
      { problem: 'Woody, sparse center (aged plant)', solution: 'Cannot rejuvenate severely woody lavender. Replace every 5–8 years. Annual light shearing after bloom prevents this.' },
      { problem: 'Xylella or shab disease (gray, dying stems)', solution: 'Remove and destroy affected plants. Do not replant lavender in the same spot for 3+ years.' },
    ],
    amazonSearchTerm: 'English Lavender live plant Lavandula',
  },

  'fescue-grass': {
    care: {
      watering: 'Water 1–1.5 inches per week (including rainfall). Deep, infrequent watering encourages deep roots. In summer heat, water 3 times per week. Fescue goes semi-dormant in extreme heat.',
      sunlight: 'The most shade-tolerant cool-season lawn grass. Performs in 4–6 hours of sun. Maintain higher mowing height (3.5–4 inches) in shady areas.',
      soil: 'Well-drained soil with pH 5.5–6.5. Core aerate every fall. Fertilize in fall (September–October) and spring (March) with slow-release nitrogen.',
    },
    seasons: {
      bestPlantingTime: 'Early fall (mid-August to October) is optimal — soil is warm, air is cool, and weed competition is reduced. Spring seeding is second choice.',
      bloomOrGrowth: 'Active growth in cool seasons (spring and fall). Summer heat causes semi-dormancy and thinning — normal behavior, not death.',
      dormancy: 'Stays green year-round in mild winters (zones 4–7). Overseed thin areas every fall. Top-dress with 1/4 inch compost after aeration.',
    },
    problems: [
      { problem: 'Brown patch fungus (circular brown patches in summer)', solution: 'Apply fungicide (azoxystrobin). Improve drainage, mow at proper height, water in morning only.' },
      { problem: 'Summer thinning in heat', solution: 'Normal for fescue. Raise mower height to 4 inches in summer. Overseed bare spots in fall.' },
      { problem: 'Grub damage (turf pulls up like carpet)', solution: 'Apply beneficial nematodes or milky spore in late summer. Chemical grub control in June–July.' },
    ],
    amazonSearchTerm: 'Tall Fescue grass seed lawn',
  },

  'japanese-maple': {
    care: {
      watering: 'Water deeply twice a week during the first 2 years. Established trees need watering during drought. Leaf scorch in summer often indicates water stress — mulch 4 inches deep to retain moisture.',
      sunlight: 'Morning sun with afternoon shade is ideal in hot climates. Full sun works in zones 5–6 with adequate moisture. Dappled light preserves red leaf color.',
      soil: 'Well-drained, slightly acidic soil (pH 5.5–6.5). Rich in organic matter. Avoid planting in heavy clay without amending. Never plant near concrete (raises pH).',
    },
    seasons: {
      bestPlantingTime: 'Spring or fall. Avoid summer planting in hot climates — root establishment is difficult in heat. Container plants: spring is best.',
      bloomOrGrowth: 'Insignificant flowers in spring. Leaf emergence in April is stunning. Peak fall color October–November (orange, red, gold depending on variety).',
      dormancy: 'Fully deciduous. Prune only in summer or late fall (never spring) to avoid bleeding sap. Structure and branch architecture beautiful in winter.',
    },
    problems: [
      { problem: 'Leaf scorch (brown leaf edges in summer)', solution: 'Move to afternoon shade. Increase watering depth. Apply 4-inch mulch ring. Scorch is cosmetic and does not kill the tree.' },
      { problem: 'Verticillium wilt (branch dieback)', solution: 'Prune affected branches 12 inches below wilt line. No chemical cure. Improve drainage and reduce stress to slow progression.' },
      { problem: 'Aphids causing sticky honeydew', solution: 'Natural predators usually control them. Spray strong water stream. Apply neem oil if infestation is severe.' },
    ],
    amazonSearchTerm: 'Japanese Maple Acer palmatum live tree',
  },

  'butterfly-bush': {
    care: {
      watering: 'Water weekly when young, every 2 weeks once established. Drought-tolerant but blooms best with consistent moisture. Avoid waterlogged conditions.',
      sunlight: 'Full sun (6–8 hours minimum). More sun equals more blooms. Shaded butterfly bushes are leggy with reduced flowering.',
      soil: 'Average, well-drained soil with pH 6.0–7.0. Does not need fertilizer — too much nitrogen reduces blooms and increases invasive spread. Lean soil is fine.',
    },
    seasons: {
      bestPlantingTime: 'Spring after last frost. Fast-growing; will reach blooming size within the first season from a quart-sized plant.',
      bloomOrGrowth: 'Blooms on new wood July–frost. Cut back hard (to 12 inches) in early spring before new growth to maintain shape and maximize blooms.',
      dormancy: 'May die back to ground in zones 5–6 (treat as perennial). In zones 7+, prune back by half in fall, hard prune in early spring.',
    },
    problems: [
      { problem: 'Invasive spreading (in some states)', solution: 'Choose sterile varieties (Lo & Behold series, Flutterby series). Deadhead before seeds set. Check your state invasive species list.' },
      { problem: 'Spider mites in hot, dry weather', solution: 'Spray undersides of leaves with strong water stream. Apply neem oil. Increase humidity around plant with mulch.' },
      { problem: 'No butterfly visits despite blooms', solution: 'Ensure host plants for caterpillars are nearby. Buddleia attracts adult butterflies for nectar but does not support larvae.' },
    ],
    amazonSearchTerm: 'Butterfly Bush Buddleia live plant',
  },

  'agave': {
    care: {
      watering: 'Water only once a month in summer, once every 6–8 weeks in winter. Never water in winter if temperatures are below 40°F. Overwatering is the number one killer.',
      sunlight: 'Full blazing sun (8+ hours). Thrives on reflected heat from walls and pavement. Never plant in shade.',
      soil: 'Gravelly, sandy, or rocky desert soil with perfect drainage. pH 7.0–8.0. Add 50% coarse grit to any planting mix. Raised beds are ideal in clay soils.',
    },
    seasons: {
      bestPlantingTime: 'Spring through early summer in desert climates. Gives the plant time to root before winter.',
      bloomOrGrowth: 'Blooms once after 10–30 years, producing a towering flower spike 15–30 feet tall. The mother plant dies after flowering; offset "pups" survive.',
      dormancy: 'No true dormancy. Growth slows in winter. Hardy to about 15°F depending on drainage — wet cold is more damaging than dry cold.',
    },
    problems: [
      { problem: 'Agave snout weevil (sudden collapse of center leaves)', solution: 'No effective treatment once infested. Remove and destroy plant to prevent spread. Apply systemic imidacloprid preventively to healthy plants.' },
      { problem: 'Root rot from overwatering or poor drainage', solution: 'Plant in raised beds with 50% grit. Never water in winter. If caught early, unpot, dry roots, dust with sulfur, replant in dry grit.' },
      { problem: 'Frost damage on tips', solution: 'Minor tip damage is cosmetic. If the central growing point (heart) freezes, the plant is lost. Protect with frost cloth when temps below 20°F.' },
    ],
    amazonSearchTerm: 'Agave americana century plant live succulent',
  },

  'hostas': {
    care: {
      watering: 'Water deeply once or twice a week. Hostas are thirsty plants — dry soil causes brown leaf edges. Mulch 3 inches deep to retain moisture. Morning watering is best.',
      sunlight: 'Full shade to part shade (0–4 hours of sun). Blue and white varieties prefer more shade; yellow/gold varieties tolerate more sun. Morning sun only if needed.',
      soil: 'Rich, moist, well-drained soil with pH 6.0–7.0. Amend with 3–4 inches of compost at planting. Fertilize once in spring with balanced slow-release fertilizer.',
    },
    seasons: {
      bestPlantingTime: 'Spring when emerging from dormancy, or early fall (6 weeks before frost) for root establishment. Divide in spring or fall every 3–5 years.',
      bloomOrGrowth: 'Foliage emerges April–May and expands through summer. Lavender or white flower stalks appear July–August — cut off spent stalks to keep tidy.',
      dormancy: 'Completely disappear below ground after frost. Mark their location to avoid accidentally digging them up. Re-emerge reliably each spring.',
    },
    problems: [
      { problem: 'Slug and snail damage (ragged holes in leaves)', solution: 'Apply iron phosphate bait (Sluggo — safe for pets and wildlife). Set out beer traps. Remove mulch from direct contact with crowns.' },
      { problem: 'Hosta virus X (distorted, mottled leaves)', solution: 'No cure. Remove and destroy infected plants. Do not divide infected plants — the virus spreads on tools. Sterilize tools between plants.' },
      { problem: 'Brown leaf edges (scorch)', solution: 'Increase watering frequency. Move to deeper shade. Add mulch to retain moisture. Brown edges are cosmetic — trim with scissors.' },
    ],
    amazonSearchTerm: 'Hosta shade perennial live plant',
  },
}
