import path from 'path'
import moduleAlias from 'module-alias';

moduleAlias.addAliases({
    "@/*":path.resolve(__dirname, '..'),
    '@/config': path.resolve(__dirname, '..', 'config'),
    '@/db': path.resolve(__dirname, '..', 'db'),
    '@/router': path.resolve(__dirname, '..', 'router'),
})

moduleAlias()