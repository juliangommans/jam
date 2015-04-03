

ActiveRecord::Schema.define(version: 20150402024221) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "jamjams", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "movie_id"
    t.boolean  "watched",    default: false
    t.integer  "prerating"
    t.integer  "postrating"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "jamjams", ["movie_id"], name: "index_jamjams_on_movie_id", using: :btree
  add_index "jamjams", ["user_id"], name: "index_jamjams_on_user_id", using: :btree

  create_table "movies", force: :cascade do |t|
    t.string   "title"
    t.integer  "trailer_id"
    t.integer  "imdb"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "name",                   default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
