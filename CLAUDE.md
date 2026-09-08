# ブランチ/worktreeでの並行作業ルール

- このプロジェクトはGitHub Pagesが`main`ブランチを直接見て自動ビルド・公開する構成（`https://a3design-aminagata.github.io/wonder-gym-tips/`）。つまり**pushがそのままデプロイ**になる
- **ブランチ側セッション**：修正してコミットし、GitHub PRを作成してmerge、pushまで自分の判断で確認なしに進めてよい。理由：
  - `main`は別worktree（リポジトリ直下）にcheckout中のため、ローカルの`git merge`では取り込めない → GitHub PR経由でmergeする
  - PRのmergeはgitが差分を見て安全に取り込む操作で、他セッションが既にmainに反映した変更を上書きで消すことがない
  - mainブランチは保護設定なし、個人用の低リスクな静的サイトであるため
- **mainセッション**：ブランチ側の変更を取り込むため、作業前に`git pull`してから進める。自分の変更はコミット→pushまで自由に進めてよい（確認不要）
- ブランチ側セッションはUI変更を行ったら、Previewでスクリーンショットを撮り、画像として（テキスト説明だけでなく）必ずチャットに添付する
