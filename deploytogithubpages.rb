# coding: utf-8
require 'bundler'
Bundler.require

Dotenv.load

currentdir = File.dirname(__FILE__)

builddir = File.join(currentdir, "build")

deploydir = ENV["DEPLOYDIR"]
if(!deploydir) then
  puts "DEPLOYDIRが未指定です"
  exit
end
tortoisegitexe = ENV["TORTOISEGITPATH"]
if(!tortoisegitexe) then
  puts "TORTOISEGITPATHが未指定です"
  exit
end

# 現在のmiddlemanプロジェクトをビルドする
print `bundle exec middleman build`

# 指定ディレクトリにビルドファイルをミラーリングする
rbsync = RbSync.new
rbsync.sync(builddir, deploydir)

# tortoisegitのコミット画面を開く
`\"#{tortoisegitexe}\" /command:commit /path:\"#{deploydir}\"`
