const fs = require('fs');
const path = require('path');

const replacements = [
  { file: 'src/app.module.ts', search: "'./match/match.module'", replace: "'./application/match.module'" },
  { file: 'src/application/controllers/estimates.controller.ts', search: "'./estimates.service'", replace: "'../../domain/services/estimates.service'" },
  { file: 'src/application/controllers/estimates.controller.ts', search: "'./dto/estimates.dto'", replace: "'../dtos/estimates.dto'" },
  { file: 'src/application/controllers/match.controller.ts', search: "'./match.service'", replace: "'../../domain/services/match.service'" },
  { file: 'src/application/controllers/match.controller.ts', search: "'../auth/", replace: "'../../auth/" },
  { file: 'src/application/controllers/match.controller.ts', search: "'./dto/", replace: "'../dtos/" },
  { file: 'src/application/controllers/pricing.controller.ts', search: "'./pricing.service'", replace: "'../../domain/services/pricing.service'" },
  { file: 'src/application/controllers/pricing.controller.ts', search: "'../prisma/prisma.service'", replace: "'../../infrastructure/database/prisma.service'" },
  { file: 'src/application/controllers/routes.controller.ts', search: "'./routes.service'", replace: "'../../domain/services/routes.service'" },
  { file: 'src/application/controllers/routes.controller.ts', search: "'../auth/jwt-auth.guard'", replace: "'../../auth/jwt-auth.guard'" },
  { file: 'src/domain/services/estimates.service.ts', search: "'./dto/estimates.dto'", replace: "'../../application/dtos/estimates.dto'" },
  { file: 'src/estimates/estimates.module.ts', search: "'./estimates.controller'", replace: "'../application/controllers/estimates.controller'" },
  { file: 'src/estimates/estimates.module.ts', search: "'./estimates.service'", replace: "'../domain/services/estimates.service'" },
  { file: 'src/pricing/pricing.module.ts', search: "'./pricing.service'", replace: "'../domain/services/pricing.service'" },
  { file: 'src/pricing/pricing.module.ts', search: "'./pricing.controller'", replace: "'../application/controllers/pricing.controller'" },
  { file: 'src/pricing/pricing.module.ts', search: "'../prisma/prisma.module'", replace: "'../infrastructure/database/prisma.module'" },
  { file: 'src/routes/routes.module.ts', search: "'./routes.service'", replace: "'../domain/services/routes.service'" },
  { file: 'src/routes/routes.module.ts', search: "'./routes.controller'", replace: "'../application/controllers/routes.controller'" },
  { file: 'src/application/match.module.ts', search: "'../pricing/pricing.module'", replace: "'../../pricing/pricing.module'" },
];

replacements.forEach(r => {
  const filePath = path.join(__dirname, r.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.split(r.search).join(r.replace);
    fs.writeFileSync(filePath, content);
  }
});
