# ブランチ/worktreeでの並行作業ルール

- このプロジェクトはGitHub Pagesが`main`ブランチを直接見て自動ビルド・公開する構成（`https://a3design-aminagata.github.io/wonder-gym-tips/`）。つまり**pushがそのままデプロイ**になる
- **ブランチ側セッション**：修正してコミットし、GitHub PRを作成してmerge、pushまで自分の判断で確認なしに進めてよい。理由：
  - `main`は別worktree（リポジトリ直下）にcheckout中のため、ローカルの`git merge`では取り込めない → GitHub PR経由でmergeする
  - PRのmergeはgitが差分を見て安全に取り込む操作で、他セッションが既にmainに反映した変更を上書きで消すことがない
  - mainブランチは保護設定なし、個人用の低リスクな静的サイトであるため
- **mainセッション**：ブランチ側の変更を取り込むため、作業前に`git pull`してから進める。自分の変更はコミット→pushまで自由に進めてよい（確認不要）
- ブランチ側セッションはUI変更を行ったら、Previewでスクリーンショットを撮り、画像として（テキスト説明だけでなく）必ずチャットに添付する

## クラウドセッション（iPhone / claude.ai/code）は main に push する

- **`claude/...` などのブランチで始まっても、作業前に `git checkout main && git pull --ff-only origin main` して main で作業し、main へ push する**（2026-09-25 ユーザー指定）。ブランチへの push だけでは本番に出ず、ユーザーが後で merge する手間になる
- push が non-fast-forward で拒否されたら `git pull --rebase origin main` してから push し直す。force push はしない
- 下の「ブランチ側セッションが PR を作って merge」はPCでworktreeを並行させる時の話。クラウドセッションは PR を作らず main で直接作業してよい
