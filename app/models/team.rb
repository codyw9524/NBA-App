class Team < ActiveRecord::Base
	has_many :players, dependent: :destroy
	validates :name, presence: true
	validates :name, uniqueness: {case_sensative: false}
end
