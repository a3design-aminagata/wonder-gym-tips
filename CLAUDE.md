# wonder-gym-tips プロジェクト指示

- GitHub Pages が `main` ブランチを直接見て自動ビルド・公開する構成（`https://a3design-aminagata.github.io/wonder-gym-tips/`）。**main への push がそのままデプロイ**になる
- UI を変えたら Preview でスクリーンショットを撮り、画像としてチャットに添付する

## ブランチ運用（PC・iPhone のどのセッションも共通）

2026-09-25 ユーザー指定。**main に直接コミットしない。毎回ブランチで作業し、確認が通ったらユーザーに聞かずに自分で main へ入れて push する。** main への push で GitHub Pages が公開される。

1. 開始時に `git fetch origin` で最新の main を取る
2. 作業ブランチを切る: `git switch -c <内容が分かる名前> origin/main`
   - クラウドセッション（iPhone / claude.ai/code）で最初から付いている `claude/...` ブランチ、PC でアプリが作った worktree のブランチは、そのまま使ってよい
   - **PC の本体フォルダ（`~/WL/wonder-gym-tips`）は main のまま置いておき、そこでブランチを切り替えない**（他のセッションが同じフォルダを使っているため）。PC で本体フォルダから始まったセッションは `git worktree add .claude/worktrees/<名前> -b <名前> origin/main` で worktree を作ってそこで作業する
3. 修正して「merge 前の確認」を通す: 画面を触った時は Preview / ローカルで開いてコンソールエラーが無く、変えた所が意図どおり表示されること
4. 最新の main を取り込む: `git fetch origin && git merge origin/main`
5. conflict は自分で解消する（両方の意図を残す。どちらを取るか判断できない時だけユーザーに聞く）。解消したら 3 の確認をもう一度
6. main へ入れる: `git push origin HEAD:main`（4 で取り込み済みなので fast-forward で入る）。**拒否されたら（他のセッションが先に入れた）4 からやり直す**
7. PC では本体フォルダの main も進めておく: `git -C ~/WL/wonder-gym-tips merge --ff-only origin/main`（本体フォルダに未コミットの変更がある時は触らない。次のセッション開始時に同期フックが追いつかせる）
8. **force push 禁止。** 入れ終わったらブランチを消す（ローカル・リモート・worktree。クラウドからはリモートを消せないのでローカルだけ）
- **例外: ユーザーが「見てから決めたい」「どっちか選びたい」と言った変更**は 6 の前で止め、スクリーンショット等を見せて OK をもらってから入れる
- GitHub の PR は作らない（Actions の分数を使い、手間が増えるだけ）
- 下の「ブランチ側セッションが PR を作って merge」は廃止。この節が優先する
