class CreateJamjams < ActiveRecord::Migration
  def change
    create_table :jamjams do |t|

      t.belongs_to :user, index: true
      t.belongs_to :movie, index: true
      t.boolean :watched
      t.integer :prerating
      t.integer :postrating
      t.timestamps null: false
    end
  end
end
