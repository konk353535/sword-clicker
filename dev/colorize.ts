import { execSync } from "child_process"
import * as fs from "fs"

const colors = {
    Adamantium: { base: "#20903e", colorize: "100%" },
    Bronze: { base: "#db5625", colorize: "100%" },
    Carbon: { base: "#283359", colorize: "100%" },
    Cobalt: { base: "#0047AB", colorize: "100%" },
    Copper: { base: "#BE5B0C", colorize: "100%" },
    Cursed: { base: "#b61f15", colorize: "100%" },
    Elvensteel: { base: "#54b54e", colorize: "100%" },
    FairySteel: { base: "#663399", colorize: "100%" },
    Gold: { base: "#ffd635", colorize: "100%" },
    Iron: { base: "#535252", colorize: "100%" },
    Meteorite: { base: "#da5824", colorize: "100%" },
    Mithril: { base: "#4682B4", colorize: "100%" },
    Obsidian: { base: "#1f1e1d", colorize: "100%" },
    Orichalcum: { base: "#FFD700", colorize: "100%" },
    Platinum: { base: "#E5E4E2", colorize: "100%" },
    Silver: { base: "#c8e0d5", colorize: "100%" },
    Steel: { base: "#9ea4a6", colorize: "100%" },
    Stone: { base: "#5d5b5b", colorize: "100%" },
    Tin: { base: "#869eac", colorize: "100%" },
    Titanium: { base: "#747c83", colorize: "100%" },
    Tungsten: { base: "#b9bed0", colorize: "100%" }
}

type OutputDef = {
    base: string
    output: string
}

type IconOpts = {
    colorize?: boolean
    resize: string
}

type IconDef = {
    options: IconOpts
    icons: OutputDef[]
}

const items: IconDef[] = [
    {
        options: {
            resize: "92x92"
        },
        icons: [
            {
                base: "axe.png",
                output: "@Axe.png"
            },
            {
                base: "pickaxe.png",
                output: "@Pickaxe.png"
            },
            {
                base: "polished.png",
                output: "polished@.png"
            }
        ]
    }
]

const out = "./dev/public/icons"
if (fs.existsSync(out)) {
    fs.rmSync(out, { recursive: true })
}
if (!fs.existsSync(out)) {
    fs.mkdirSync(out, { recursive: true })
}

items.forEach((item) => {
    item.icons.forEach((icon) => {
        const src = `./dev/${icon.base}`
        const baseFinal = `${out}/${icon.output}`.replace("@", "")
        execSync(`convert ${src} -resize ${item.options.resize} ${baseFinal}`)
        Object.entries(colors).forEach((color) => {
            const final = `${out}/${icon.output}`.replace("@", color[0])
            if (fs.existsSync(final)) {
                fs.rmSync(final)
            }
            // if (!fs.existsSync(final)) {
            // colorize and output
            console.log(`generating ${out}/${color[0]}${icon.output}`)
            execSync(
                `convert ${src} \\( +clone +matte -fill "${color[1].base}" -colorize ${color[1].colorize} +clone +swap -compose overlay -composite \\) -compose SrcIn -composite -resize ${item.options.resize} ${final}`
            )
            // execSync(`optipng ${outDir}/${color[0]}${variant.output} -o5 -nb -nc -np`)
            // }
        })
    })
})

// Object.entries(item[1]).forEach((component) => {
//     const componentName = component[0]
//     const options = component[1].options
//     component[1].icons.forEach((variant) => {
//         const outDir = `${out}/${itemName}/${componentName}`
//         const src = `./icon_source/${itemName}/${componentName}/${variant.base}`

//         if (!fs.existsSync(outDir)) {
//             fs.mkdirSync(outDir, { recursive: true })
//         }

//         if (variant.base.includes("skin")) {
//             const final = `${outDir}/${variant.output}`
//             // just copy as output instead
//             if (!fs.existsSync(final)) {
//                 console.log(`resizing ${final}`)
//                 execSync(`convert ${src} -resize ${options.resize} ${final}`)
//                 // execSync(`optipng ${outDir}/${variant.output} -o5 -nb -nc -np`)
//             }
//         } else if (options.colorize !== false) {
//             const baseOutput = `${outDir}/${variant.base}`
//             if (!fs.existsSync(baseOutput)) {
//                 console.log(`resizing base ${baseOutput}`)
//                 execSync(`convert ${src} -resize ${options.resize} ${baseOutput}`)
//             }
//             Object.entries(colors).forEach((color) => {
//                 const final = `${outDir}/${color[0]}${variant.output}`

//                 if (!fs.existsSync(final)) {
//                     // colorize and output
//                     console.log(`generating ${outDir}/${color[0]}${variant.output}`)
//                     execSync(
//                         `convert ${src} \\( +clone +matte -fill "${color[1].base}" -colorize ${color[1].colorize} +clone +swap -compose overlay -composite \\) -compose SrcIn -composite -resize ${options.resize} ${outDir}/${color[0]}${variant.output}`
//                     )
//                     // execSync(`optipng ${outDir}/${color[0]}${variant.output} -o5 -nb -nc -np`)
//                 }
//             })
//         } else {
//             const final = `${outDir}/${variant.output}`
//             // just copy as output instead
//             if (!fs.existsSync(final)) {
//                 console.log(`resizing ${final}`)
//                 execSync(`convert ${src} -resize ${options.resize} ${outDir}/${variant.output}`)
//                 // execSync(`optipng ${outDir}/${variant.output} -o5 -nb -nc -np`)
//             }
//         }
//     })
// })
