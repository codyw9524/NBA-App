class Player < ActiveRecord::Base
	belongs_to :team
	validates :name, :team_id, presence: true
	validates :name, uniqueness: {case_sensative: false}
end
