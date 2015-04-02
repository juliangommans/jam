class CreateJamjams < ActiveRecord::Migration
  def change
    create_table :jamjams do |t|

      t.timestamps null: false
    end
  end
end
