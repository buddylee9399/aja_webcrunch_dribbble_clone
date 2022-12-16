class Shot < ApplicationRecord
	belongs_to :user
	has_many :comments, dependent: :destroy
	
	# mount_uploader :user_shot, UserShotUploader
	has_one_attached :user_shot
	is_impressionable
	acts_as_votable
end