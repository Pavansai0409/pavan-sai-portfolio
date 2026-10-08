# Portrait background removal

Asset: `public/images/pavan-portrait.png`.

Source: user-provided photograph. Edited with the built-in image-generation tool for background extraction, saved as a PNG with transparency. The original source is unchanged. The website uses `profile.photo` and `profile.photoAlt` in `src/content/portfolio.ts` to display it instead of the monogram.

## Edit prompt

Use case: background-extraction. Edit target: the attached photograph of the smiling man. Remove only the entire wall, black panel, light strip, and all background around the person. Return a clean photographic cutout on a genuinely transparent alpha background. Preserve the original person's identity and all original visible foreground details exactly: facial features, expression, teeth, hair, beard, skin texture and tone, head angle, neck, thin chain, black T-shirt and gray plaid shirt, posture and visible crop. Do not regenerate or beautify the face, change lighting or clothing, invent body parts, add shadows, add text, or replace the backdrop with any color. Keep fine natural hair edges and avoid background halos. Maintain the original portrait composition with the full head and visible shoulders; transparent space should replace the existing background.
