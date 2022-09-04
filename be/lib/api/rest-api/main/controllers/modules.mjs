import chista from '../../chista.mjs';

import ModuleCreate from '../../../../use-cases/main/modules/Create.mjs';
import ModuleShow   from '../../../../use-cases/main/modules/Show.mjs';
import ModuleList   from '../../../../use-cases/main/modules/List.mjs';
import ModuleDelete from '../../../../use-cases/main/modules/Delete.mjs';
import ModuleUpdate from '../../../../use-cases/main/modules/Update.mjs';

export default {
    create : chista.makeUseCaseRunner(ModuleCreate, req => req.body),
    update : chista.makeUseCaseRunner(ModuleUpdate, req => ({ ...req.body, id: req.params.id })),
    list   : chista.makeUseCaseRunner(ModuleList, req => ({ ...req.query, ...req.params })),
    show   : chista.makeUseCaseRunner(ModuleShow, req  => ({ id: req.params.id })),
    delete : chista.makeUseCaseRunner(ModuleDelete, req => ({ ...req.body, id: req.params.id }))
};
