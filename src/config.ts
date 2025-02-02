import { loadConfig } from 'c12'
import { getLastGitTag, getCurrentGitBranch } from './git'

export interface ChangelogConfig {
  types: Record<string, { title: string}>
  scopeMap: Record<string, string>
  github: string
  from: string
  to: string
}

const ConfigDefaults: ChangelogConfig = {
  types: {
    fix: { title: '🐛 Fixes' },
    feat: { title: '🚀 Features' },
    refactor: { title: '💅 Refactors' },
    perf: { title: '🔥 Performance' },
    examples: { title: '🏀 Examples' },
    docs: { title: '📖 Documentation' },
    chore: { title: '🏡 Chore' },
    build: { title: '📦 Build' },
    test: { title: '✅ Tests' },
    types: { title: '🌊 Types' },
    style: { title: '🎨 Styles' },
    ci: { title: '🤖 CI' }
  },
  github: '',
  from: '',
  to: '',
  scopeMap: {}
}

export async function loadChangelogConfig (cwd: string, overrides?: Partial<ChangelogConfig>): Promise<ChangelogConfig> {
  const { config } = await loadConfig<ChangelogConfig>({
    cwd,
    name: 'changelog',
    defaults: ConfigDefaults,
    overrides: overrides as ChangelogConfig
  })

  if (!config.from) {
    config.from = await getLastGitTag()
  }

  if (!config.to) {
    config.to = await getCurrentGitBranch()
  }

  return config
}
