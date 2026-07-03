/**
 * 外部リンクの一元管理
 *
 * サイト内で参照する外部URLはすべてここに集約する。
 * Footer / Navigation / Blog / Portfolio など各所からは、
 * URL文字列を直接書かずに `externalLinks` を参照すること。
 * （散在・重複・値の食い違いを防ぐための単一の情報源）
 */
export const externalLinks = {
  /** 本人のSNS / プロフィール */
  social: {
    github: 'https://github.com/Taira0222',
    x: 'https://x.com/Taira_En0222',
    qiita: 'https://qiita.com/taira0222',
    linkedin: 'https://www.linkedin.com/in/taira-aikawa-engineer/',
  },

  /** Qiita API（Blogセクションの記事取得で使用） */
  qiitaApi: {
    base: 'https://qiita.com/api/v2',
  },

  /** ポートフォリオ各作品の外部リンク（作品IDごと） */
  projects: {
    jukuCloud: {
      repo: 'https://github.com/taira0222/juku-cloud',
      repoFrontend: 'https://github.com/taira0222/juku-cloud-frontend',
      repoBackend: 'https://github.com/taira0222/juku-cloud-backend',
    },
    portfolioSite: {
      live: 'https://taira0222.github.io/portfolio/',
      repo: 'https://github.com/Taira0222/taira0222.github.io',
    },
    todoRails: {
      live: 'https://todo-rails-application.onrender.com/',
      repo: 'https://github.com/Taira0222/todo-rails-application',
    },
    qiitaBlog: {
      /** プロフィールは social.qiita と同一 */
      profile: 'https://qiita.com/taira0222',
      dailyPostAchievement: 'https://qiita.com/Taira0222/items/c8ce0989bb048941e0ef',
    },
    contentPipeline: {
      repo: 'https://github.com/Taira0222/content-publish-pipeline',
    },
  },
} as const;
